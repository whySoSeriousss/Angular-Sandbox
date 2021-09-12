import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeComponent } from './components/cake/cake.component';
import { CarsComponent } from './components/cars/cars.component';
import { HelloComponent } from './components/hello/hello.component';

const routes: Routes = [
  {path: 'hello', component: HelloComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'cake', component: CakeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
