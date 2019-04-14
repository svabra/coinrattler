import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Tab1Page } from './tab1.page';
import { EarningsModalPage } from './earnings-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, EarningsModalPage],
  // since the model needs to be loaded dynamically, it must be added to entryComponents.
  entryComponents: [EarningsModalPage]
})
export class Tab1PageModule {}
