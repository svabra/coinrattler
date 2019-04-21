import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, of, from } from 'rxjs';
import { Settings } from '../models/settings';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings;
  annualWage: number;
  hoursePerDay: number;
  currency: number;

  constructor(private storage: Storage ) { }

  public saveSettings(annualWage: number, hoursPerDay: number) {

    console.log('SettingsService::saveSettings: ' + annualWage + ' ' + hoursPerDay);
    this.settings = new Settings();
    this.settings.annualWage = annualWage;
    this.settings.hoursPerDay = hoursPerDay;
    
    localStorage.setItem('settings', JSON.stringify(this.settings));
    
  }

  public getSettings(): Settings {
    const settings = JSON.parse(localStorage.getItem('settings'));
    return settings == null ? new Settings() : settings;
  }

}
