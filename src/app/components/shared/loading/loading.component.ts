import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean = false;
  loadingSubscription: Subscription = new Subscription();


  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadingSubscription = this.loadingService.loading.subscribe(status => {
      this.loading = status;
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
