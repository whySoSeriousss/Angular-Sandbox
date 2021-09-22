import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm?: FormGroup;
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  validator?: object;
  validRegister: boolean = false;
  
  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required]
    });

    if (this.storageService.get('token') && this.storageService.get('user')){

      this.validRegister = true;
    }
  }

  registerUser() {
    // this.username = this.registerForm?.controls.username.value;

    // this.email = this.registerForm?.controls.email.value;

    // this.password = this.registerForm?.controls.password.value;

    // this.first_name = this.registerForm?.controls.first_name.value;

    // this.last_name = this.registerForm?.controls.last_name.value;

    // this.phone = this.registerForm?.controls.phone.value;

    // this.validator = {"username": this.username, "email": this.email, "password:": this.password, "first_name": this.first_name, "last_name": this.last_name, "phone:": this.phone};

    
    console.log('Form result:', this.registerForm?.value);

    this.apiService.request('register', 'post', this.registerForm?.value).subscribe(result => {

      if (result) {

        console.log("Registration data: ", result);
        this.validRegister = true;
      }
    });    
  }
}
