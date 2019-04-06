import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  annualWage: number;

  constructor(private storage: Storage){}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('annualWage').then((wage) => {
      const _wage = parseFloat(wage);
      console.log('your annual wage', _wage);
      if (typeof _wage === 'number') {
        this.annualWage = _wage;
        console.log('update annual wage field');
      } else{
        console.log('FAIL: not a number' + this.annualWage);
      }
    });
  }

  computeAnnualWage() {
    this.storage.set('annualWage', this.annualWage);
    console.log('annual wage stored: ' + this.annualWage);
  }

  // Or to get a key/value pair
  

  // function sendData(data) {
  //   events.publish('data:created', data);
  // }
}
