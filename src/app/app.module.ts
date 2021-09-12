import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { CarsComponent } from './components/cars/cars.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { CakeComponent } from './components/cake/cake.component';
import { CModalComponent } from './components/shared/c-modal/c-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    CarsComponent,
    NavComponent,
    ModalComponent,
    CakeComponent,
    CModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
