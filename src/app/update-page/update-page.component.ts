import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Services/patient.service';
import { patient } from '../Interface/patientRegistration';
import { visit } from '../Interface/visit-details';
import { newVisit } from '../Interface/newVisit';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.scss'
})
export class UpdatePageComponent implements OnInit {
  patient: patient | undefined;
  originalDate: Date = new Date();
  selectedDate: string = new Date().toLocaleDateString();
  patientId: string = "";
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
    this.patientService.getPatientById(this.patientId.trim().toUpperCase()).subscribe(data => {
      this.patient = data;
      this.searchResult = "Patient fetched successfully.."
    },error=>{
      this.searchResult = "Patient not available"
    });
    this.getVisits();
    this.feedBackMessage = "";
  }

  UpdateVisit(formValue: any) {
    const acupoint = formValue.point ? formValue.point.toUpperCase() : '';
    const Visit: newVisit = {
      PatientId: this.patientId,
      AcuPoint: acupoint
    };

    // Call the service to add the new visit
    this.patientService.addNewVisit(Visit).subscribe(
      (response:any) => {
        this.feedBackMessage = response;
        this.getVisits();  // Refresh visits
      },
      (error:any) => {
        this.feedBackMessage = error;
      }
    );

  // Optionally reset the acuPoint field if needed
  this.acuPoint = "";
  this.patient= undefined;
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
