import { Injectable } from '@angular/core';
import { patient } from '../Interface/patientRegistration';
import { catchError, Observable, of, throwError } from 'rxjs';
import { visit } from '../Interface/visit-details';
import { HttpClient, HttpParams } from '@angular/common/http';
import { patientTableData } from '../Interface/patientTable';
import { newVisit } from '../Interface/newVisit';
import { patientCountByClinic } from '../Interface/patientsCountByClinic';

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
        else if(error.status==409){
          errorMessage = 'Already user available with same phonenumber and name.'
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
    const newArray = this.patients.map((patient)=>patient.clinicPlace);
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

  //get patient counts by clinicwise
  getPatientsByClinicwise():Observable<patientCountByClinic[]>{
    return this.httpClient.get<patientCountByClinic[]>(`${this.apiUrl}Patient/GetPatientCountByClinic`);
  }

  //get visits
  getPreviousVisits(rangeOption:number,startDate?:Date,endDate?:Date):Observable<patientCountByClinic[]>{
    let params = new HttpParams().set('rangeOption',rangeOption);

    if(rangeOption===4&&startDate&&endDate){
      params = params.set('customStart',startDate.toISOString())
                      .set('customEnd',endDate.toISOString());
    }

    return this.httpClient.get<patientCountByClinic[]>(`${this.apiUrl}Visits/visitCounts`,{params})
  }
}
