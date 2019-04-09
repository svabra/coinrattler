import { Component, OnInit } from '@angular/core';
import { NavController, Events, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { isNumber } from 'util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  currency = 'CHF';

  workingHourStart = '08:00';
  workingHourEnd = '17:00';
  appStart = new Date();

  annualWage: number;

  isLeisureTime: boolean;

  current = 0;
  today: number;

  perMonth: number;
  perWeek: number;
  perDay: number;
  perHour: number;
  perMinute: number;
  perSecond: number;

  constructor(public events: Events, private storage: Storage, public route: Router, public alertController: AlertController) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('annualWage').then((wage) => {
      const _wage = parseFloat(wage);
      console.log('get latest annual wage', _wage);
      if (typeof _wage === 'number' && !isNaN(_wage) ) {
        console.log('Valid wage available: ' + _wage);
        this.annualWage = _wage;
        // If wage-relevant settings changed, you must reset the current.

        this.calcLiveEarnings();
        this.calcStatistics();
      } else {
        this.presentAlert();
        this.route.navigateByUrl('/tabs/tab2');
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No salary given',
      subHeader: 'It\'s like life: you ain\'t get anything for free',
// tslint:disable-next-line: max-line-length
      message: 'For this app to make sense, you must provide a salery. If you don\'t trust us, play with a fake salery. We do not and will not ever store personal data.',
      buttons: ['I\'m smart and understand.']
    });

    await alert.present();
  }

  calcLiveEarnings() {
    this.perSecond = (this.annualWage / 220) / 8 / 3600;
    
    // this.current = this.current + this.perSecond;

    // today calculations
    const now = new Date();
    // start of the working hours
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0);
    if(now >= start && now < endTime) {
      this.isLeisureTime = false;
      // compute the "current" value
      this.current += this.perSecond;
      // continue with the "Today" value
      const workingSeconds = (now.getTime() - start.getTime()) / 1000;
      this.today = workingSeconds * this.perSecond;
      const TIME_IN_MS = 1000;
      const hideFooterTimeout = setTimeout( () => {
        this.calcLiveEarnings();
      },  TIME_IN_MS);
    } else {
      this.isLeisureTime = true;
      console.log('It\'s passed 17:00. No one is working anymore.');
    }
  }

  calcStatistics() {
    this.perMonth = this.annualWage / 12;
    this.perWeek = this.annualWage / 52;
    this.perDay = this.annualWage / 220;
    this.perHour = this.perDay / 8;
    this.perMinute = this.perHour / 60;
    this.perSecond = this.perMinute / 60;
  }

  resetAppStart() {
    this.appStart = new Date();
    this.current = 0;
  }



}
