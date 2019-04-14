import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {WageCalcService} from '../services/wage-calc.service';

@Component({
  selector: 'app-earnings-modal',
  templateUrl: './earnings-modal.page.html',
  styleUrls: ['./earnings-modal.page.scss'],
})
export class EarningsModalPage implements OnInit {

  // "value" passed in componentProps
  @Input() contStartTime: Date;
  current: number;
  today: number;
  annualWage: number;
  startTime: Date;

  constructor(public modalCtrl: ModalController,
    navParams: NavParams,
    private storage: Storage,
    private wageCalcService: WageCalcService ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.updateToday();
    this.startTime = this.contStartTime;
    this.updateCurrent();
    }

  updateToday(){
    this.storage.get('annualWage').then((wage) => {
      const _wage = parseFloat(wage);
      
      if (typeof _wage === 'number' && !isNaN(_wage) ) {
        this.annualWage = _wage;
        // If wage-relevant settings changed, you must reset the current.
        this.today = this.wageCalcService.calcToday(_wage);
      } else {
        console.log('Should never happen.');
      }

       const TIME_IN_MS = 1000;
      const hideFooterTimeout = setTimeout( () => {
        this.updateToday();
      },  TIME_IN_MS);

    });
  }

  updateCurrent(){
    this.storage.get('annualWage').then((wage) => {
      const _wage = parseFloat(wage);
      
      if (typeof _wage === 'number' && !isNaN(_wage) ) {
        this.annualWage = _wage;
        // If wage-relevant settings changed, you must reset the current.
        this.current = this.wageCalcService.calcCurrent(_wage, this.startTime);
      } else {
        console.log('Should never happen.');
      }

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
