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
  errorMessage:string="";

  constructor(private formbuilder:FormBuilder,private patientService:PatientService){
    this.registrationForm=this.formbuilder.group({
      clinicPlace: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      age: ['', [Validators.required, Validators.min(1)]],
      gender:['',Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
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
      this.patientService.addPatient(newPatient).subscribe(
        (response) => {
          alert('Patient created successfully!');
          this.registrationForm.reset();  // Reset the form after successful submission
        },
        (error) => {
          this.errorMessage = error;  // Display error message
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
