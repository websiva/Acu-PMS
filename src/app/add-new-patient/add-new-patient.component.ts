import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patient } from '../Interface/patientRegistration';
import { PatientService } from '../Services/patient.service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrl: './add-new-patient.component.scss'
})
export class AddNewPatientComponent {
  registrationForm:FormGroup;

  constructor(private formbuilder:FormBuilder,private patientService:PatientService){
    this.registrationForm=this.formbuilder.group({
      clinicPlace: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      occupation: ['', Validators.required],
      surgeryHistory: ['', Validators.maxLength(210)],
      previousHistory: ['', Validators.maxLength(210)],
      symptoms: ['', Validators.maxLength(210)],
      complaints: ['', Validators.maxLength(210)]
    });
  }
  submit(){
    if (this.registrationForm.valid) {
      const newPatient: patient = this.registrationForm.value;
      console.log('New Patient:', newPatient);
      this.patientService.addPatient(newPatient);
    } else {
      console.log('Form is invalid');
    }
  }
}
