import { Component,  OnInit} from '@angular/core';
import { NavController, Events, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { isNumber } from 'util';
import { ActivatedRoute, Router} from '@angular/router';
import { EarningsModalPage} from './earnings-modal.page';
import { WageCalcService} from '../services/wage-calc.service';
import { SettingsService } from '../services/settings.service';
import { Settings } from '../models/settings';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isDev = false;
  currency = 'CHF';

  workingHourStart = '08:00';
  workingHourEnd = '17:00';
  appStart = new Date();

  settings: Settings;
  hoursPerDay: number;

  current = 0;
  today: number;

  perMonth: number;
  perWeek: number;
  perDay: number;
  perHour: number;
  perMinute: number;
  perSecond: number;

  constructor(public events: Events,
    private storage: Storage,
    public route: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    private wageCalcService: WageCalcService,
    private settingsSerivce: SettingsService) {}

  ngOnInit() {
    this.settings = this.settingsSerivce.getSettings();

    if (this.settings.annualWage) {
      // If wage-relevant settings changed, you must reset the current.
      this.calcLiveEarnings();
      this.calcStatistics();
    } else {
      console.log('has no values in settings. ' + JSON.stringify(this.settings));
    }
  }

  ionViewDidEnter() {
    this.settings = this.settingsSerivce.getSettings();
    if (!this.settings.annualWage){
      this.presentAlert();
      this.route.navigateByUrl('/tabs/tab2');
    }else{
      this.calcLiveEarnings();
      this.calcStatistics();
    }
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

  async presentEarningsModal() {
    const modal = await this.modalController.create({
      component: EarningsModalPage,
      componentProps: {
        contStartTime: this.appStart
      },
      animated: true,
      showBackdrop: true
    });
    return await modal.present();
  }

  calcLiveEarnings() {
    this.perSecond = (this.settings.annualWage / 220) / 8 / 3600;
    // today calculations
    if (this.isOfficeHours()) {
      // compute the "current" value
      this.current += this.perSecond;
      // continue with the "Today" value
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
      const workingSeconds = (now.getTime() - start.getTime()) / 1000;
      this.today = workingSeconds * this.perSecond;
      const TIME_IN_MS = 1000;
      const hideFooterTimeout = setTimeout(() => {
        this.calcLiveEarnings();
      }, TIME_IN_MS);
    } 
  }

  calcStatistics() {
    this.perMonth = this.settings.annualWage / 12;
    this.perWeek = this.settings.annualWage / 52;
    this.perDay = this.settings.annualWage / 220;
    this.perHour = this.perDay / this.settings.hoursPerDay;
    this.perMinute = this.perHour / 60;
    this.perSecond = this.perMinute / 60;
  }

  isOfficeHours() {
    if (this.isDev) {
      return true;
    } else {
      const now = new Date();
      // start of the working hours
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0, 0);

      if (now >= start && now < endTime) {
        return true;
      } else {        
        return false;
      }
    }
  }

  resetAppStart() {
    this.appStart = new Date();
    this.current = 0;
  }
}