import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loginForm?: FormGroup;
  currentTheme="blue";
  email?: string;
  password?: string;
  recipient?: object;

  constructor(
    public settingService: SettingsService,
    public apiService: ApiService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.settingService.theme) {
      this.currentTheme = this.settingService.theme;
    }


    this.settingService.outsetTheme.subscribe(newTheme => {
      console.log('New theme: ', newTheme);

      this.currentTheme = newTheme;
    })

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    });

    
  }

  loginButton() {
    this.email = this.loginForm?.controls.email.value;
    this.password = this.loginForm?.controls.password.value;

    // this.apiService.request('login', 'post', { "email": "angular@yopmail.com",    "password": "1qaz0okm!" } ).subscribe(
    //   result => {
    //     console.log('results are: ', result);
    //   }
    // )

    this.recipient = {"email": this.email, "password": this.password};
  
    this.apiService.request('login', 'post', this.recipient).subscribe(result =>{
    console.log(result);
    });
  }

  }
