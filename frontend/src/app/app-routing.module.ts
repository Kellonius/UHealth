import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './parent-pages/home-component/home-component.component';
import { DetailsComponent } from './parent-pages/details-component/details-component.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: "",
  component: HomeComponent
},
{
  path: 'facility/:FacilitySkey',
  component: DetailsComponent,
  data: {
    breadcrumb: "Facility Details"
  }
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
