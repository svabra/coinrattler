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

  annualWage: number;

  current = 0;
  today: number;

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
      console.log('your annual wage', _wage);
      if (typeof _wage === 'number' && !isNaN(_wage) ) {
        console.log('Valid wage available: ' + _wage);
        this.annualWage = _wage;
        this.calc();
      } else {
        this.presentAlert();
        this.route.navigateByUrl('/tabs/tab2');
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No salary given',
      subHeader: 'It\'s like life: you ain\'t get shit for free',
// tslint:disable-next-line: max-line-length
      message: 'For this app to make sense, you must provide a salery. If you don\'t trust, play with a fake salery. We do not and will not ever store personal data.',
      buttons: ['I\'m not stupid and understand.']
    });

    await alert.present();
  }

  calc() {

    this.perDay = this.annualWage / 220;
    this.perHour = this.perDay / 8;
    this.perSecond = this.perHour / 3600;
    this.current += this.perSecond;
    this.current = this.current + this.perSecond;

    // today calculations
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    const workingSeconds = (now.getTime() - start.getTime()) / 1000;

    this.today = workingSeconds * this.perSecond;

    const TIME_IN_MS = 1000;
    const hideFooterTimeout = setTimeout( () => {
      this.calc();
    },  TIME_IN_MS);
  }



}
