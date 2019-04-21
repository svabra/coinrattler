import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {WageCalcService} from '../services/wage-calc.service';
import { SettingsService } from '../services/settings.service';
import { Settings } from '../models/settings';

@Component({
  selector: 'app-earnings-modal',
  templateUrl: './earnings-modal.page.html',
  styleUrls: ['./earnings-modal.page.scss'],
})
export class EarningsModalPage implements OnInit {

  // "value" passed in componentProps
  @Input() contStartTime: Date;
  settings: Settings;
  current: number;
  today: number;
  annualWage: number;
  startTime: Date;

  constructor(public modalCtrl: ModalController,
    navParams: NavParams,
    private storage: Storage,
    private wageCalcService: WageCalcService,
    private settingsSerivce: SettingsService ) { }

  ngOnInit() {
    this.settings = this.settingsSerivce.getSettings();
    this.updateToday();
    this.startTime = this.contStartTime;
    this.updateCurrent();
  }

  ionViewDidEnter() {
    
    }

  updateToday(){
    this.today = this.wageCalcService.calcToday(this.settings);

     const TIME_IN_MS = 1000;
      const hideFooterTimeout = setTimeout( () => {
        this.updateToday();
      },  TIME_IN_MS);

    
  }

  updateCurrent(){
    this.storage.get('annualWage').then((wage) => {
      this.current = this.wageCalcService.calcCurrent(this.settings, this.startTime);

      const TIME_IN_MS = 1000;
      const hideFooterTimeout = setTimeout( () => {
        this.updateCurrent();
      },  TIME_IN_MS);

    });
  }

  resetStartTime(){
    this.startTime = new Date();
  }


  closeModal(){
    //let data = { 'foo': 'bar' };
    this.modalCtrl.dismiss();
  }

}
