import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentTheme="blue";

  constructor(
    public settingService: SettingsService
  ) { }

  ngOnInit(): void {
    if (this.settingService.theme) {
      this.currentTheme = this.settingService.theme;
    }


    this.settingService.outsetTheme.subscribe(newTheme => {
      console.log('New theme: ', newTheme);

      this.currentTheme = newTheme;
    })

    
  }

}
