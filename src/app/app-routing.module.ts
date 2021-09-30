import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeComponent } from './components/cake/cake.component';
import { CarFormComponent } from './components/cars/car-form/car-form.component';
import { CarsComponent } from './components/cars/cars.component';
import { HelloComponent } from './components/hello/hello.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { BlockChildRouteGuard } from './guards/block-child-route.guard';

const routes: Routes = [
  {path: 'hello', component: HelloComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'cake', component: CakeComponent, canActivate: [AuthGuard], data: {role: 'admin'}},
  {path: 'cars/add', component: CarFormComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'car/edit/:slug', component: CarFormComponent},
  {path: 'register/signup', component: RegisterComponent },
  {path: 'users', component: UsersComponent, canActivateChild: [BlockChildRouteGuard], children: [
    {path: 'view/:id', component: UserDetailsComponent},
    // {path: 'hello', component: HelloComponent}
  ]},
  {path: '**', redirectTo: 'cars'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
