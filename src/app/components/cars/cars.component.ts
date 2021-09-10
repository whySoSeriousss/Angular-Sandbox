import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Car } from '../../models/car';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  carList: Car[]=[];
  searchText: string ='';
  filterCarlist: Car[]=[];
  public show: boolean = false;
  public toggleButton: any = 'Show'; //sorry for the any :/

  constructor(
    public dataService: DataService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    // this.carList=this.dataService.getCars();
    this.carList=this.storage.get('cars');
    

    if(!this.carList || !this.carList.length){
      this.dataService.seedCars();
      this.carList=this.storage.get('cars');
      
    }
    this.filterCarlist=this.carList;
      
  }

  deleteCar(ref: string) {
    console.log('Reference: ', ref);
    this.carList=this.carList.filter(car => car.ref != ref);
    this.storage.set('cars', this.carList);
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

    
    if(this.show)  
      this.toggleButton = "Hide";
    else
      this.toggleButton = "Show";
  }

}
