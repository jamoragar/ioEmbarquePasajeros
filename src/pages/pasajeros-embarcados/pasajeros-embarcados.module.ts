import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasajerosEmbarcadosPage } from './pasajeros-embarcados';

@NgModule({
  declarations: [
    PasajerosEmbarcadosPage,
  ],
  imports: [
    IonicPageModule.forChild(PasajerosEmbarcadosPage),
  ],
})
export class PasajerosEmbarcadosPageModule {}
