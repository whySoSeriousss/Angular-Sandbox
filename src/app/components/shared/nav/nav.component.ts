import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SettingsService } from 'src/app/services/settings.service';
import { StorageService } from 'src/app/services/storage.service';

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
  validLogin?: boolean = false;
  user: any = {};

  constructor(
    public settingService: SettingsService,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    public storageService: StorageService
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

    if (this.storageService.get('token') && this.storageService.get('user')){

      this.validLogin = true;
    }

    const userResult = this.storageService.get('user');
    if(userResult){
      this.user = userResult;
      this.validLogin = true;
      console.log(this.validLogin);
    }

    
  }

  loginButton() {
    this.email = this.loginForm?.controls.email.value;
    this.password = this.loginForm?.controls.password.value;

    this.recipient = {"email": this.email, "password": this.password};
  
    this.apiService.request('login', 'post', this.recipient).subscribe((recipient: {[key: string]: string | any}) =>{
    console.log('Results: ', recipient);
    if (recipient) {
      this.storageService.set('token', recipient['token']);
      this.storageService.set('user', recipient['user']);
      this.validLogin = true;
    }

    });

       // this.apiService.request('login', 'post', { "email": "angular@yopmail.com",    "password": "1qaz0okm!" } ).subscribe(
    //   result => {
    //     console.log('results are: ', result);
    //   }
    // )
  }

  logOut(){
    console.log('User logged Out!',);
    this.validLogin = false;
    this.storageService.delete('token');
    this.storageService.delete('user');
    
  }

  }
