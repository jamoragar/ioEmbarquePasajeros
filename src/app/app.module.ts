import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

//Pantallas de la App
import { LoginPage } from '../pages/login/login';
import { SeleccionPage } from '../pages/seleccion/seleccion';
import { ViajesPage } from "../pages/viajes/viajes";
import { ResumenPage } from '../pages/resumen/resumen';
import { VerificacionPage } from "../pages/verificacion/verificacion";
import { ScanQrPage } from "../pages/scan-qr/scan-qr";
import { RechazoPage } from "../pages/rechazo/rechazo";
import { AprobacionPage } from "../pages/aprobacion/aprobacion";
import { PasajerosPendientesPage } from "../pages/pasajeros-pendientes/pasajeros-pendientes";
import { PasajerosEmbarcadosPage } from "../pages/pasajeros-embarcados/pasajeros-embarcados";
import { AyudaPage } from "../pages/ayuda/ayuda";
//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
//providers
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { CmbscannerProvider } from '../providers/cmbscanner/cmbscanner';
//Importando Modulo
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SeleccionPage,
    ViajesPage,
    ResumenPage,
    VerificacionPage,
    ScanQrPage,
    RechazoPage,
    AprobacionPage,
    PasajerosPendientesPage,
    PasajerosEmbarcadosPage,
    AyudaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SeleccionPage,
    ViajesPage,
    ResumenPage,
    VerificacionPage,
    ScanQrPage,
    RechazoPage,
    AprobacionPage,
    PasajerosPendientesPage,
    PasajerosEmbarcadosPage,
    AyudaPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Md5,
    RestServiceProvider,
    StorageServiceProvider,
    IonicStorageModule,
    CmbscannerProvider

  ]
})
export class AppModule {}
