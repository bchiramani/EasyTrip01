import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { AccountServiceProviderComponent } from './components/account-service-provider/account-service-provider.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';
import { DashboardMessagesComponent } from './components/dashboard-messages/dashboard-messages.component';
import { DashboardServiceProvidersComponent } from './components/dashboard-service-providers/dashboard-service-providers.component';
import { SigninAdminComponent } from './components/signin-admin/signin-admin.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'experiences', component: ExperiencesComponent},
  {path: 'destinations', component: DestinationsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'addExperience', component: AddExperienceComponent},
  {path: 'addExperience/:id', component: AddExperienceComponent},
  {path: 'experiences/account', component: AccountComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account/editAccount', component: EditAccountComponent},
  {path: 'account/editPost/:experience', component: EditExperienceComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user/:id', component: DisplayUserComponent},
  {path: 'accountServiceProvider', component: AccountServiceProviderComponent},
  {path:'dashboard/usersDashboard', component: DashboardUsersComponent},
  {path:'dashboard/messagesDashboard', component: DashboardMessagesComponent},
  {path:'dashboard/serviceProvidersDashboard', component: DashboardServiceProvidersComponent},
  {path:'signinAdmin', component: SigninAdminComponent},
  { path: '**', component: NotFoundComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
