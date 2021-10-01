import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm? : FormGroup;
  userId?: string | null = '';
  fields: string[] =[];
  formLabels:  {[key: string]: string | any} = {};

  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.userId){
      this.getUserDetails();
    }
    console.log("user id: ", this.userId);

    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['',Validators.required],    
    });

    this.fields = Object.keys(this.userForm.controls);
    this.formLabels = {first_name: "First Name", last_name : "Last Name"};
    console.log("fields:", this.fields);
  }

  getUserDetails() {
    this.api.request('userDetails', 'get', undefined, this.userId).subscribe( userResult => {
      console.log("user details: ", userResult);
      this.userForm?.patchValue(userResult);
    })
  }

  getLabel(key: string) {
    return this.formLabels[key] ? this.formLabels[key] : key;
  }

  editUser() {
    console.log(this.userForm?.value);
    if (this.userForm || this.userId) return;
    this.api.request('editUser', 'put', this.userForm, this.userId).subscribe(result => {
      console.log("Edits:", result);
    })
  }

}
