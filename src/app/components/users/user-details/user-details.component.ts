import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from '../../../models/user';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  userId: string | null = "";
  userDetails?: User;
  routeSubscription?: Subscription;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserDetails();
    // console.log('User id: ', this.userId);

    if (!this.routeSubscription) 
    {
      this.routeSubscription = this.router.events.subscribe(eventResult => {
        //console.log('Router Events: ', eventResult);
        if (eventResult instanceof NavigationEnd && eventResult.url.includes('/users/view/')) 
        {
          const urlArray = eventResult['url'].split('/');
          // console.log('URL Array: ', urlArray);
          this.userId = urlArray[urlArray.length - 1];
          console.log('value of userId:', this.userId);
          this.getUserDetails();
        }
      });
    }

  }

  getUserDetails() {
    this.api.request('userDetails', 'get', undefined, this.userId).subscribe((userResult: any)  => {
      console.log('user results: ', userResult);
      if (userResult) 
      {
        this.userDetails = userResult;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
