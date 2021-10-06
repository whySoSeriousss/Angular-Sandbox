import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Starships } from 'src/app/models/starships';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit, OnDestroy {

  starshipDetails?: Starships;
  starshipName: string | null = "";
  routeSubscription?: Subscription;

  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.starshipName = this.activatedRoute.snapshot.paramMap.get('name');
    this.getStarshipDetails();

    if (!this.routeSubscription)
    {
      this.routeSubscription = this.router.events.subscribe(eventResult => {
        if (eventResult instanceof NavigationEnd && eventResult.url.includes('/starships/view/'))
        {
          const urlArray = eventResult['url'].split('/');
          this.starshipName = urlArray[urlArray.length - 1];
          console.log('name of starship:', this.starshipName);
          this.getStarshipDetails();
        }
      });
    }
    
  }

  getStarshipDetails() {
    this.api.request('starshipDetails', 'get', undefined, this.starshipName).subscribe((starshipResult: any) => {
      console.log('starship details: ', starshipResult);
      if (starshipResult)
      {
        this.starshipDetails = starshipResult;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
 
}
