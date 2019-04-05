import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponentComponent } from './parent-pages/home-component/home-component.component';
import { ZipcodeComponentComponent } from './parent-pages/home-component/components/zipcode-component/zipcode-component.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatInputModule, MatCardModule,
   MatSidenavModule, MatSidenavContent, MatSelectModule, MatDividerModule, MatSliderModule, MatDialogModule, MatBottomSheetModule, MatNavList, MatListModule, MatExpansionModule } from '@angular/material';
  
import { AgmCoreModule } from '@agm/core';
import { MapComponentComponent } from './parent-pages/home-component/components/map-component/map-component.component';
import { FilterComponentComponent } from './parent-pages/home-component/components/filter-component/filter-component.component';
import { FacilityListComponentComponent } from './parent-pages/home-component/components/facility-list-component/facility-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    HomeComponentComponent,
    ZipcodeComponentComponent,
    MapComponentComponent,
    FilterComponentComponent,
    FacilityListComponentComponent
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwsqgVlNs5AFdWu-qACJX1GTO6hawhAFw'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
