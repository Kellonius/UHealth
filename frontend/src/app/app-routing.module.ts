import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './parent-pages/home-component/home-component.component';
import { DetailsComponent } from './parent-pages/details-component/details-component.component';
import { ComparisonComponent } from './parent-pages/comparison-component/comparison-component.component';

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
{
  path: 'compare',
  component: ComparisonComponent,
  data: {
    breadcrumb: "Compare Facilities"
  }
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
