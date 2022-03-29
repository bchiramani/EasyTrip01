import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { BestDestinationsComponent } from './components/best-destinations/best-destinations.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { PlanTripComponent } from './components/plan-trip/plan-trip.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeamComponent } from './components/team/team.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { JwPaginationModule } from 'jw-angular-pagination';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { SignupServiceProviderComponent } from './components/signup-service-provider/signup-service-provider.component';
import { SigninServiceProviderComponent } from './components/signin-service-provider/signin-service-provider.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import { AccountServiceProviderComponent } from './components/account-service-provider/account-service-provider.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';
import { DashboardServiceProvidersComponent } from './components/dashboard-service-providers/dashboard-service-providers.component';
import { DashboardMessagesComponent } from './components/dashboard-messages/dashboard-messages.component';
import { DashboardAdminsComponent } from './components/dashboard-admins/dashboard-admins.component';
import { SigninAdminComponent } from './components/signin-admin/signin-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MissionsComponent,
    ServicesComponent,
    HomeComponent,
    BestDestinationsComponent,
    ConnectionComponent,
    PlanTripComponent,
    ExperiencesComponent,
    DestinationsComponent,
    ContactComponent,
    TeamComponent,
    ExperienceComponent,
    SignupComponent,
    SigninComponent,
    AddExperienceComponent,
    AccountComponent,
    NotFoundComponent,
    EditExperienceComponent,
    EditAccountComponent,
    MyFilterPipe,
    LoaderComponent,
    DashboardComponent,
    DisplayUserComponent,
    SignupUserComponent,
    SignupServiceProviderComponent,
    SigninServiceProviderComponent,
    SigninUserComponent,
    AccountServiceProviderComponent,
    DashboardUsersComponent,
    DashboardServiceProvidersComponent,
    DashboardMessagesComponent,
    DashboardAdminsComponent,
    SigninAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //InMemoryWebApiModule.forRoot(DataService),
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
