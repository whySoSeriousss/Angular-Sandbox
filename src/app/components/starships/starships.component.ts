import { Component, OnInit } from '@angular/core';
import { Starships } from 'src/app/models/starships';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {

  starshipList: Starships[] = [];

  constructor(
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.getStarships();

  }

  getStarships() {
    this.api.request('starshipList', 'get').subscribe((starships: {[endpoints: string]: string | any}) => {
      console.log('Get starships: ', starships);
      if (starships) {
        this.starshipList = starships['results'];
        console.log('test: ', this.starshipList);
      }
    })
  }

}
