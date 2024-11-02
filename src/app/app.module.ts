import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { HealingDetailsComponent } from './healing-details/healing-details.component';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PatientDetailsComponent,
    UpdatePageComponent,
    HealingDetailsComponent,
    AddNewPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
