import { Component, OnInit } from '@angular/core';
import { patient } from '../Interface/patientRegistration';
import { patientTableData } from '../Interface/patientTable';
import { PatientService } from '../Services/patient.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { visit } from '../Interface/visit-details';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  filterForm:FormGroup;
  patients:patientTableData[]=[];
  filteredPatients:patientTableData[]=[];
  paginatedPatients:patientTableData[]=[];
  pageSize = 5;
  pageIndex = 0;
  selectedClinic: string = '';
  clinicPlaces:string[]=[];

  patient: patient|undefined;
  patientVisits:visit[]=[];

  private searchDebounceTimer:any;

  displayedColumns: string[] = ['id', 'name', 'age', 'clinicPlace', 'phoneNumber', 'actions'];

  constructor(private patientService: PatientService,private formBuilder:FormBuilder,private router:Router) { 
    this.filterForm = this.formBuilder.group({
      clinicName:['All'],
      id:['']
    })
  }

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(){
    this.patientService.getPatients().subscribe(data=>{
      this.patients = data;
      this.paginatedPatients = data;
      this.filteredPatients = data;
      console.log(data);
      this.extractingClinic();
    },error=>{
      console.error('Error fetching patients data:', error);
    });
  }

  /*updatePaginatedPatients(){
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPatients = this.patients.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPatients();
  }*/

  filterByClinic(){
    let clinic = this.filterForm.get('clinicName')?.value;

    this.filteredPatients = this.patients.filter(item=>{
      const clinics  = !clinic||clinic==="All"||item.clinicPlace===clinic;

      return clinics;
    })
    this.paginatedPatients = [...this.filteredPatients];
  }

  get patientId(){
    return this.filterForm.get('id')?.value?.toUpperCase()||'';
  }

  onKeyUpSearchbyId(event:KeyboardEvent){
    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(()=>{
      this.searchById();
    },300);
  }

  searchById(){
    let Id = (this.patientId);
    if (Id === '') {
      // Reset to clinic-filtered list if search input is empty
      this.paginatedPatients = [...this.filteredPatients];
    } else {
      // Filter clinic-filtered patients by ID
      this.paginatedPatients = this.filteredPatients.filter(patient =>
        patient.id.includes(Id)
      );
    }
  }

  extractingClinic(){
    const newArray = this.patients.map((patient)=>patient.clinicPlace);

    const uniqueClinicPlaces = Array.from(new Set(newArray));

    this.clinicPlaces = ['All',...uniqueClinicPlaces];
  }

  //see all details 
  seeAllDetails(id:string){
    this.patientService.getPatientById(id).subscribe(data=>{
      this.patient = data;
      console.log(data);
      this.getVisits(id);
    });
  }

  //get visits by patientId
  getVisits(id:string){
    this.patientService.getVisitsById(id).subscribe((data)=>{
      this.patientVisits = data;
      console.log(this.patientVisits);
    })
  }
}
