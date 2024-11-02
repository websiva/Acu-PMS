import { Component, OnInit } from '@angular/core';
import { patient } from '../Interface/patientRegistration';
import { patientTableData } from '../Interface/patientTable';
import { PatientService } from '../Services/patient.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  patients:patientTableData[]=[];
  paginatedPatients:patientTableData[]=[];
  pageSize = 5;
  pageIndex = 0;
  selectedClinic: string = '';
  clinicPlaces:string[]=['Udumalpet', 'Coimbatore', 'Dharapuram', 'Pollachi', 'Palani', 'Palladam', 'Pongalur', 'Chittode', 'Tiruppur'];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patients = this.patientService.getPatients();
    this.paginatedPatients = this.patients;
    //this.updatePaginatedPatients();
  }

  updatePaginatedPatients(){
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPatients = this.patients.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPatients();
  }

  filterByClinic(event:Event){
    const value = event.target as HTMLSelectElement;
    this.selectedClinic = value.value;
  }

  searchById(event:Event){

  }
}
