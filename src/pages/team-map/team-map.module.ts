import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamMapPage } from './team-map';

@NgModule({
  declarations: [
    TeamMapPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamMapPage),
  ],
})
export class TeamMapPageModule {}
