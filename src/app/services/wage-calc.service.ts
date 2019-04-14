import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class WageCalcService {
  annualWage = 0;

  current = 0;
  today: number;

  perMonth: number;
  perWeek: number;
  perDay: number;
  perHour: number;
  perMinute: number;
  perSecond: number;

  constructor(private storage: Storage ) {}

  ngOnInit() {
    this.getWage();
  }

  calcStatistics() {
    this.perMonth = this.annualWage / 12;
    this.perWeek = this.annualWage / 52;
    this.perDay = this.annualWage / 220;
    this.perHour = this.perDay / 8;
    this.perMinute = this.perHour / 60;
    this.perSecond = this.perMinute / 60;
  }

  public calcToday (annualWage: number){
    if(this.annualWage == 0){
      this.annualWage = this.getWage();
    }

    this.perSecond = (this.annualWage / 220) / 8 / 3600;
    // today calculations
    // compute the "current" value
    // this.current += this.perSecond;
    // continue with the "Today" value
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    const workingSeconds = (now.getTime() - start.getTime()) / 1000;
    this.today = workingSeconds * this.perSecond;
    //console.log('WageCalcService: this.annualWage= '+ this.annualWage+', this.today = ' + this.today + ', workingSeconds=' + workingSeconds);
    return this.today;
  }

  public calcCurrent (annualWage: number, startTime: Date){
    if(startTime == null)
      startTime = new Date();
    if(this.annualWage == 0){
      this.annualWage = this.getWage();
    }

    this.perSecond = (this.annualWage / 220) / 8 / 3600;
    
    const now = new Date();
    const workingSeconds = (now.getTime() - startTime.getTime()) / 1000;
    this.current = workingSeconds * this.perSecond;
    console.log('WageCalcService: this.annualWage= '+ this.annualWage+', this.current = ' + this.current + ', workingSeconds=' + workingSeconds);
    return this.current;
  }

  isOfficeHours () {
    const now = new Date();
    // start of the working hours
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0);

    if (now >= start && now < endTime){
      return true;
    } else {
      // return true;
      // for DEV purpose only
      return true;
    }
  }

  getWage(){
    this.storage.get('annualWage').then((wage) => {
      this.annualWage = parseFloat(wage);   
      console.log('WageCalcService: wage=' + wage);   
    });
    return this.annualWage;
  }

}
