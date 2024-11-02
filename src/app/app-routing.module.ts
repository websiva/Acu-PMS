import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { LoginComponent } from './login/login.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { HealingDetailsComponent } from './healing-details/healing-details.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'patient-details',component:PatientDetailsComponent},
  {path:'login',component:LoginComponent},
  {path:'update',component:UpdatePageComponent},
  {path:'visit-details',component:HealingDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
