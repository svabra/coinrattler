import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, of, from } from 'rxjs';
import { Settings } from '../models/settings';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  DEFAULT_HOURSPERDAY = 8;

  settings: Settings;
  annualWage: number;
  hoursePerDay: number;
  currency: number;

  constructor(private storage: Storage ) { }

  public saveSettings(annualWage: number, hoursPerDay: number) {
    this.settings = new Settings();
    this.settings.annualWage = annualWage;
    if (!hoursPerDay) {
      this.settings.hoursPerDay = this.DEFAULT_HOURSPERDAY;
    } else {
      this.settings.hoursPerDay = hoursPerDay;
    }

    localStorage.setItem('settings', JSON.stringify(this.settings));

  }

  public getSettings(): Settings {
    const settings = JSON.parse(localStorage.getItem('settings'));
    console.log('Parse settings object from local storage: ' + JSON.stringify(settings));
    return settings == null ? new Settings() : settings;
  }

}
