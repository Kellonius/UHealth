import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './parent-pages/home-component/home-component.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponentComponent
},
{
  path: "",
  component: HomeComponentComponent
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
