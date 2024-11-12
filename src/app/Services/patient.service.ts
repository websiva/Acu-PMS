import { Injectable } from '@angular/core';
import { patient } from '../Interface/patientRegistration';
import { catchError, Observable, of, throwError } from 'rxjs';
import { visit } from '../Interface/visit-details';
import { HttpClient } from '@angular/common/http';
import { patientTableData } from '../Interface/patientTable';
import { newVisit } from '../Interface/newVisit';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl:string="https://localhost:7092/";

  patients: patient[] = [];

  visitDetails:newVisit[]=[];


  constructor(private httpClient:HttpClient) { }

  addPatient(patient: patient):Observable<string> {
    return this.httpClient.post<string>(`${this.apiUrl}Patient/CreateNewPatient`,patient,{responseType:'text' as 'json'})
    .pipe(
      catchError(error => {
        // Handle error here
        let errorMessage = 'An unexpected error occurred.';

        if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } 
        return throwError(errorMessage);
      })
    );
  }

  getPatients():Observable<patientTableData[]> {
    return this.httpClient.get<patientTableData[]>(this.apiUrl+'Patient/getAllPatients');
  }

  getPatientById(id: string): Observable<patient> {
    return this.httpClient.get<patient>(`${this.apiUrl}Patient/GetPatientById?id=${id}`);
  }

  getAllClinics():Observable<string[]>{
    const newArray = this.patients.map((patient)=>patient.ClinicPlace);
    const uniqueClinicPlaces = Array.from(new Set(newArray));
    return of(['All',...uniqueClinicPlaces]);
  }

  /*getPatientByIdandClinic(id: string,clinicName:string):patient[] | undefined{

  }*/

  //add visit
  addNewVisit(Visit:newVisit):Observable<string>{    
    return this.httpClient.post<string>(`${this.apiUrl}Visits/NewVisitEntry`,Visit,{responseType:'text' as 'json'})
    .pipe(
      catchError(error => {
        // Handle error here
        let errorMessage = 'An unexpected error occurred.';

        if (error.status === 400) {
          errorMessage = error.error || 'A visit has already been added for today.';  // Custom error message from backend
        } else if (error.status === 404) {
          errorMessage = 'Patient not found.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }

        return throwError(errorMessage);
      })
    );
  }

  //fetch visit by id
  getVisitsById(id:string):Observable<visit[]>{
    return this.httpClient.get<visit[]>(`${this.apiUrl}Visits/GetVisitsById?id=${id}`);
  }
}
