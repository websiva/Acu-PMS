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
  registrationForm: FormGroup;
  errorMessage: string = "";

  constructor(private formbuilder: FormBuilder, private patientService: PatientService) {
    this.registrationForm = this.formbuilder.group({
      clinicPlace: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      surgeryHistory: ['', Validators.maxLength(210)],
      previousHistory: ['', Validators.maxLength(210)],
      symptoms: ['', Validators.maxLength(210)],
      complaints: ['', Validators.maxLength(210)]
    });
  }
  submit() {
    if (this.registrationForm.valid) {
      const formData: patient = this.registrationForm.value;
      // Replace empty fields with 'N/A'
      formData.surgeryHistory = formData.surgeryHistory || 'N/A';
      formData.previousHistory = formData.previousHistory || 'N/A';
      formData.symptoms = formData.symptoms || 'N/A';
      formData.complaints = formData.complaints || 'N/A';

      
      this.patientService.addPatient(formData).subscribe(
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
