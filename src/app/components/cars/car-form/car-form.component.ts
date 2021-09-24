import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  carForm?: FormGroup;
  carSlug?: string | null ='';
  selectedCar?: any;
  carDetails: any = {}; 

  constructor(
    public formBuilder: FormBuilder,
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.carSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (this.carSlug) {
      this.getCarDetails();
      console.log("Car slug: ", this.carSlug);
    }

  //   if (this.activatedRoute.snapshot.paramMap.get('slug')) {
  //     this.carSlug = this.activatedRoute.snapshot.paramMap.get('slug');
  //     console.log("Car slug: ", this.carSlug);
 
  //     this.api.request('carDetails', 'get', undefined, this.carSlug).subscribe(car => {
  //       this.selectedCar = car;
  //       console.log('Edits being done on: ', this.selectedCar);
 
  //       if(car){
  //         this.carForm?.patchValue(car);
  //         this.carDetails = car;
  //       }
  //     });
  // }


    // this.api.getCarList().subscribe((cars: {[endpoint: string]: any}) => {
    //   console.log('Edits being done to: ', cars['data'].filter((car: {
    //     slug: string | null | undefined;
    //   }) => car.slug == this.carSlug
    //   ));

    //   if (cars){
    //     this.carForm?.patchValue(cars);
    //   }
      
    // })

    

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

  async getCarDetails() {

    const results = await this.api.request('carDetails', 'get', undefined, this.carSlug).toPromise();

    console.log('To Promise Works: ', results);

    if (results) {
      this.carForm?.patchValue(results);
      this.carDetails = results;
    }

  }

  editCar() {
    this.api.request('editCar', 'put', this.carForm?.value, this.carSlug).subscribe(async (result: any) =>{
      console.log('Edit Car: ', result);
      //Destructuring
      // const {_id: identity, name} = result;
      // console.log('testing destructuring:', identity, name);
      if (result) {
        Swal.fire('Success', 'Your Car details have been updated!', 'success').then((SwalResult) => {
          console.log('redirectUrl: ', SwalResult);
          if(SwalResult.value) {
            this.router.navigate(['/cars'])
          }
        });

        // const {value: redirectUrl} = await Swal.fire('Success', 'Your Car details have been updated!', 'success');
        // console.log('redirectUrl: ', redirectUrl);
        // if (redirectUrl) {
        //   this.router.navigate(['/cars']);  
        // }
      }
    });
  }

  uploadImage(event: any) {
    console.log('upload image event: ', event.target.files[0]);
    const fileUpload = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', fileUpload, fileUpload.name);

    if(fileUpload){
      this.api.request('imageUpload', 'post', formData).subscribe((results:any) => {
        //console.log("Image upload results:", results);
        console.log('Car image details:', this.carDetails);
        console.log("Image upload secure_url:", results['secure_url']);
        this.carDetails.image_car = results['secure_url'];
        
        this.carForm?.controls.image_car.setValue(results['secure_url']);
      })
    }
  }

  uploadFileDirective(event: any) {
    console.log('upload file Directive', event);
    let fileUpload = event[0];
    const formData: FormData = new FormData();
    formData.append('image', fileUpload); 

    if(formData){
      this.api.request('imageUpload', 'post', formData).subscribe((results:any) => {
        //console.log("Image upload results:", results);
        console.log('Car image details:', this.carDetails);
        console.log("Image upload secure_url:", results['secure_url']);
        this.carDetails.image_car = results['secure_url'];
        this.carForm?.controls.image_car.setValue(results['secure_url']);
      });
    }

  }

}
