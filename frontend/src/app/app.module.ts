import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './parent-pages/home-component/home-component.component';
import { ZipcodeComponentComponent } from './parent-pages/home-component/components/zipcode-component/zipcode-component.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatInputModule, MatCardModule,
   MatSidenavModule, MatSidenavContent, MatSelectModule, MatDividerModule, MatSliderModule, MatDialogModule, MatBottomSheetModule, MatNavList, MatListModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
  
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './parent-pages/home-component/components/map-component/map-component.component';
import { FilterComponentComponent } from './parent-pages/home-component/components/filter-component/filter-component.component';
import { FacilityListComponentComponent } from './parent-pages/home-component/components/facility-list-component/facility-list-component.component';
import { DetailsComponent } from './parent-pages/details-component/details-component.component';
import { LocationService } from './Services/location.service';
import { FacilityService } from './Services/facility.service';
import { SharedService } from './Services/shared.service';
import { ProcedureStatisticsService } from './Services/procedure-statistics.service';
import { PhysiciansService } from './Services/physician.service';
import { ComparisonComponent } from './parent-pages/comparison-component/comparison-component.component';
import { FacilityTypesService } from './Services/facility-types.service';
import { ApplicationService } from './Services/app-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InsuranceService } from './Services/insurance.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    HomeComponent,
    ZipcodeComponentComponent,
    MapComponent,
    FilterComponentComponent,
    FacilityListComponentComponent,
    DetailsComponent,
    ComparisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatListModule,
    MatTooltipModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwsqgVlNs5AFdWu-qACJX1GTO6hawhAFw'
    }),
  ],
  providers: [
    ApplicationService,
    FacilityService,
    FacilityTypesService,
    InsuranceService,
    LocationService,
    PhysiciansService,
    ProcedureStatisticsService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
