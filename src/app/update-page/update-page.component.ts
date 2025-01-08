import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Services/patient.service';
import { patient } from '../Interface/patientRegistration';
import { visit } from '../Interface/visit-details';
import { newVisit } from '../Interface/newVisit';
import { HttpErrorResponse } from '@angular/common/http';
import { updatePatient } from '../Interface/updatePatient';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.scss'
})
export class UpdatePageComponent implements OnInit {
  patients: updatePatient[] =[];
  originalDate: Date = new Date();
  selectedDate: string = new Date().toLocaleDateString();
  patientId: string = "";
  phonenumber:string="";
  clinic:string="";
  clinicPlaces: string[] = [];
  feedBackMessage: string = "";
  patientVisits: visit[] = [];
  acuPoint: string = "";
  searchResult:string="";

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getAllClinicValues();
  }

  getAllClinicValues() {
    this.patientService.getAllClinics().subscribe(data => {
      this.clinicPlaces = data;
    })
  }

  searchPatient() {
    if(this.phonenumber.length===10){
      this.patientService.getPatientsByPhone(this.phonenumber).subscribe(data => {
        this.patients = data;
        console.log(data);
        this.searchResult = "Patient fetched successfully.."
      },error=>{
        this.searchResult = "Patient not available"
      });
    }
    else if(this.patientId.length===8){
      this.patientService.getPatientsById(this.patientId.trim().toUpperCase()).subscribe(data => {
        this.patients = data;
        console.log(data);
        this.searchResult = "Patient fetched successfully.."
      },error=>{
        this.searchResult = "Patient not available"
      });
    }
  }

  searchPatientByPhone(){
    
  }

  selectedUser(id:string,place:string){
    this.patientId=id;
    this.clinic=place;
    this.getVisits();
    this.feedBackMessage = "";
  }

  UpdateVisit(formValue: any) {
    const acupoint = formValue.point ? formValue.point.toUpperCase() : '';
    const Visit: newVisit = {
      PatientId: this.patientId,
      AcuPoint: acupoint,
      ClinicName:this.clinic
    };

    // Call the service to add the new visit
    this.patientService.addNewVisit(Visit).subscribe(
      (response:any) => {
        this.feedBackMessage = response;  // Refresh visits
        this.getVisits();
      },
      (error:any) => {
        this.feedBackMessage = error;
      }
    );

    
  // Optionally reset the acuPoint field if needed
  this.acuPoint = "";
  this.phonenumber="";
  this.patients= [];
  this.patientId = "";
  this.patientVisits=[];
  }

  getVisits() {
    this.patientService.getVisitsById(this.patientId).subscribe(data => {
      this.patientVisits = data;
      console.log(this.patientVisits);
    })
  }

}
