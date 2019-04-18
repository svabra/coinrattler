import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  // TODO: must hook anobserver to annualWage
  // default values
  annualWage= 100000;
  hoursPerDay = 8.3;

  constructor(private storage: Storage){}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('annualWage').then((wage) => {
      const _wage = parseFloat(wage);
      if (!isNaN(_wage)) {
        this.annualWage = _wage;
      } else {
        console.log('FAIL: not a number' + this.annualWage);
      }
    });

    // hours per day
    this.storage.get('hoursPerDay').then((hoursPerDay) => {
      const _hoursPerDay = parseFloat(hoursPerDay);
      if (!isNaN(_hoursPerDay)) {
        this.hoursPerDay = _hoursPerDay;
      } else {
        console.log('FAIL: not a number' + this.hoursPerDay);
      }
    });
  }

  saveAnnualWage(evt) {
    this.storage.set('annualWage', this.annualWage);
    console.log('annual wage stored: ' + this.annualWage);
  }

  saveHoursPerDay(evt) {
    this.storage.set('hoursPerDay', this.hoursPerDay);
    console.log('hoursPerDay saved: ' + this.hoursPerDay);
  }

  doBlur($event) {
    console.log($event);
    $event.target.blur();
  }

  /**
   * Allow only numbers to be inserted
   * @param evt 
   */
  validateOnlyNumbers(evt) {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    const regex = /[0-9]|\./;
    if(!regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
}
