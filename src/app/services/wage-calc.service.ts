import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class WageCalcService {
    current = 0;
  today: number;

  perMonth: number;
  perWeek: number;
  perDay: number;
  perHour: number;
  perMinute: number;
  perSecond: number;

  constructor(private storage: Storage ) {}


  calcStatistics(settings: Settings) {
    const annualWage = settings.annualWage;
    this.perMonth = annualWage / 12;
    this.perWeek = annualWage / 52;
    this.perDay = annualWage / 220;
    this.perHour = this.perDay / settings.hoursPerDay;
    this.perMinute = this.perHour / 60;
    this.perSecond = this.perMinute / 60;
  }

  public calcToday (settings: Settings) {
    this.perSecond = (settings.annualWage / 220) / 8 / 3600;
    
    // continue with the "Today" value
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    const workingSeconds = (now.getTime() - start.getTime()) / 1000;
    this.today = workingSeconds * this.perSecond;
    return this.today;
  }

  public calcCurrent (settings: Settings, startTime: Date) {
    if (startTime == null) {
      startTime = new Date();
    }
    this.perSecond = (settings.annualWage / 220) / settings.hoursPerDay / 3600;

    const now = new Date();
    const workingSeconds = (now.getTime() - startTime.getTime()) / 1000;
    this.current = workingSeconds * this.perSecond;
    return this.current;
  }

  isOfficeHours () {
    const now = new Date();
    // start of the working hours
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0);

    if (now >= start && now < endTime) {
      return true;
    } else {
      // return true;
      // for DEV purpose only
      return true;
    }
  }

}
