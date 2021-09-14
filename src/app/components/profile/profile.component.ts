import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  selectedTheme: string ='';

  constructor(
    public settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.selectedTheme = this.settingService.theme;
  }

  updateTheme() {
    console.log('theme value: ', this.selectedTheme);
    
    this.settingService.theme = this.selectedTheme;
  }

  

}
