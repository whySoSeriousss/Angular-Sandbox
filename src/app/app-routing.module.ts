import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { HelloComponent } from './components/hello/hello.component';

const routes: Routes = [
  {path: 'hello', component: HelloComponent},
  {path: 'cars', component: CarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
