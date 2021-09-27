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
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  
  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required]

    }, { validators: this.comparePasswords });

    if (this.storageService.get('token') && this.storageService.get('user')){

      this.validRegister = true;
    }
  }

  registerUser() {
    
    console.log('Form result:', this.registerForm?.value);

    this.apiService.request('register', 'post', this.registerForm?.value).subscribe(result => {

      if (result) {

        console.log("Registration data: ", result);
        this.validRegister = true;

        window.location.reload();
      }
    });    
  }

  comparePasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;
    return password  === confirm_password 
    ? null : {notSame: true};
  }

  


}
