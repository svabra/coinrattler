import { Component, OnInit, Input } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../services/settings.service';
import { Settings } from '../models/settings';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  @Input()
  settings: Settings;
  annualWage: number;
  hoursPerDay: number;

  constructor(private storage: Storage, private settingsService: SettingsService){}

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    this.annualWage = this.settings.annualWage;
    this.hoursPerDay = this.settings.hoursPerDay;
  }

  ionViewDidEnter() {
    }

  saveSettings(evt) {
    this.settingsService.saveSettings(this.annualWage, this.hoursPerDay);
  }

  doBlur($event) {
    console.log($event);
    $event.target.blur();
  }

  /**
   * Allow only numbers to be inserted
   * @param evt 
   */
  validateOnlyNumbers(evt) {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    const regex = /[0-9]|\./;
    if(!regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
}
