import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../Services/patient.service';
import { patient } from '../Interface/patientRegistration';

@Component({
  selector: 'app-healing-details',
  templateUrl: './healing-details.component.html',
  styleUrl: './healing-details.component.scss'
})
export class HealingDetailsComponent implements OnInit {

  patientId: string = "";
  patient: patient[] | undefined = [];

  constructor(private route: ActivatedRoute, private patientService: PatientService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
    })

    this.patient = this.patientService.getPatientById(this.patientId);
    //console.log(this.patient);
  }
}
