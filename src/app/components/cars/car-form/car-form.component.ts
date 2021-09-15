import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  carForm?: FormGroup;
  carSlug?: string | null ='';

  constructor(
    public formBuilder: FormBuilder,
    public api: ApiService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.carSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    console.log('car slug:', this.carSlug);

    this.carForm = this.formBuilder.group({
      ref: ['', Validators.required],
      name: ['', Validators.required],
      desc_excerpt: ['', Validators.required],
      body_type: ['', Validators.required],
      engine: ['', Validators.required],
      mileage: ['', Validators.required],
      fuel_type: ['', Validators.required],
      transmission: ['', Validators.required],
      door_count: ['', Validators.required],
      image_car: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      date_online: ['', Validators.required],
      date_offline: ['', Validators.required],
      currency: ['', Validators.required],
      contact_phone: ['', Validators.required],
      contact_email: ['', Validators.required],
    });
  }

  saveCar() {
    console.log('value of carForm', this.carForm?.value);

    this.api.request('addCar', 'post', this.carForm?.value).subscribe(result => {
      console.log('Add Car Result: ', result);
    });
  }

}
