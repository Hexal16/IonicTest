import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaseClass } from './base-class';

@NgModule({
  declarations: [
    BaseClass,
  ],
  imports: [
    IonicPageModule.forChild(BaseClass),
  ],
})
export class BaseClassModule {}
