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

  computeAnnualWage(evt) {
    this.storage.set('annualWage', this.annualWage);
    console.log('annual wage stored: ' + this.annualWage);
    console.log(evt);
    //evt.target.blur();
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
