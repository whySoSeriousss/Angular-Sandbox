import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Cake } from '../../models/cake';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.scss']
})
export class CakeComponent implements OnInit {
  cakeList: Cake[]=[];
  filterCake: Cake[]=[];
  searchCakeText: string='';
  tooltipMessage="Remove this Item!";
  

  constructor(
    public dataService: DataService,
    public storage: StorageService
  ) { }

  ngOnInit(): void {
    this.cakeList = this.storage.get('cake');

    if(!this.cakeList || !this.cakeList.length){
      this.dataService.seedCake();
      this.cakeList = this.storage.get('cake');
    }

    this.filterCake = this.cakeList;

  }

  searchCake() {
    //allowing search to take place without being case sensitive
    const text = this.searchCakeText.toLocaleLowerCase();
    
    if(this.searchCakeText){//on having text in the search bar
      //lamba method to assign the search factors[name&category]
      this.filterCake = this.filterCake.filter(cake => {
        return cake.name.toLocaleLowerCase().includes(text) ||
        cake.category.toLocaleLowerCase().includes(text);
      }) //elimination of case sensitivity and checking for matching text from the actual cakeList
      return;
    }
    this.filterCake=this.cakeList;

  }

  clearCakeSearch() {
    //reinitialisation of the search bar to empty
    this.searchCakeText='';
    this.searchCake();
  }

  deleteCake(id: string) {
    //lambda method in the filter method to return cakes by their 'id', to be deleted
    this.filterCake = this.cakeList.filter(cake => cake.id != id);
    //re-initialise the list to the updated one(fliterCake)
    this.cakeList = this.filterCake; 
    this.storage.set('cake', this.cakeList);
  }




}
