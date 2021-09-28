import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { CarsComponent } from './components/cars/cars.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { CakeComponent } from './components/cake/cake.component';
import { CModalComponent } from './components/shared/c-modal/c-modal.component';
import { CarFormComponent } from './components/cars/car-form/car-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { interceptorsProviders } from './interceptors/interceptors';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { NgxLoadingModule } from 'ngx-loading';
import { RegisterComponent } from './components/register/register.component';
import { UploadDirective } from './directives/upload.directive';
import { UsersComponent } from './components/users/users.component';
import { CardListTemplateComponent } from './components/shared/card-list-template/card-list-template.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    CarsComponent,
    NavComponent,
    ModalComponent,
    CakeComponent,
    CModalComponent,
    CarFormComponent,
    ProfileComponent,
    FooterComponent,
    LoadingComponent,
    RegisterComponent,
    UploadDirective,
    UsersComponent,
    CardListTemplateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    NgxLoadingModule.forRoot({})
    
  
  ],
  providers: [interceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
