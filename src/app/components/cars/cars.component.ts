import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Car } from '../../models/car';
import { DataService } from '../../services/data.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  carList: Car[]=[];
  searchText: string ='';
  filterCarlist: Car[]=[];
  show: boolean = false;
  tooltipMessage="This is a delete button";

  constructor(
    public dataService: DataService,
    public storage: StorageService,
    public api: ApiService
  ) { }

  ngOnInit(): void {
    // this.carList=this.dataService.getCars();
    this.getCars();
    // this.carList=this.storage.get('cars');
    

    // if(!this.carList || !this.carList.length){
    //   this.dataService.seedCars();
    //   this.carList=this.storage.get('cars');
      
    // }
    
      
  }

  getCars() {
    this.api.request('carList', 'get').subscribe((cars: {[endpoints: string]: any}) =>{
      console.log("cars from server:", cars);

      if (cars){
        this.carList = cars['data'];
      
        this.filterCarlist=this.carList;
      }
    });
  }

  deleteCar(ref: string, id: string) {
    console.log('Reference: ', ref);

    Swal.fire({
      title: "Are you sure?!",
      text: "This action is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!"
    }).then(res => {
      if (res.isConfirmed) {
        console.log('Car will be deleted');
        this.api.request('deleteCar', 'delete', undefined, id).subscribe(result => {
          console.log('Delete result: ', result);
          if (result) {
            this.getCars();
          }
        });

      }
    });
    // this.filterCarlist=this.carList.filter(car => car.ref != ref);
    // this.carList = this.filterCarlist;
    // this.storage.set('cars', this.carList);
  }

  searchCar() {
    console.log('this.searchText', this.searchText);

    const text = this.searchText.toLowerCase();
    if (this.searchText){
      this.filterCarlist=this.filterCarlist.filter(car => {
        return car.name.toLocaleLowerCase().includes(text) || 
               car.body_type.toLocaleLowerCase().includes(text);
      })
      return ;
    }

    this.filterCarlist=this.carList;
    
  }

  clearSearch() {
    console.log('this.clearText');
    this.searchText='';
    this.searchCar();
  }

  toggle() {
    this.show = !this.show; 
  }

}
