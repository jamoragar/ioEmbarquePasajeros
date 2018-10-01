import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events, Content, Platform } from 'ionic-angular';
//Importamos el plugin para Escanear Codigo QR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// Importamos Servicio Rest para validacion de codigo QR
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
// Importamos siguiente pantalla
import { RechazoPage } from "../rechazo/rechazo";
import { AprobacionPage } from "../aprobacion/aprobacion";

//importamos el scanner nuevo de qr
import { CmbscannerProvider, Settings } from '../../providers/cmbscanner/cmbscanner';


declare var cmbScanner:any;

@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  max:number;
  current:number;
  stroke: number = 12;
  radius: number = 80;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#2eb355';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;

  @ViewChild(Content) content: Content;
  scannerActive:string ="barcode";
  public removeBtn : boolean;
  public connected : boolean;
  private settings : Settings;
  triggerMode : string = "analytics";
  list_data : any[] = [];

  tramo:any;
  data = {tipo_ticket:'', id_ticket:'', id_cruce:'', id_tramo:'', val_seed:''};
  dataVehiculo = {tipo_ticket:'', id_ticket:'', id_cruce:'', id_tramo:'', val_seed:''};
  dataQR:string;
  resultadoSQL:any ={ticket:'', resultado:''};
  public cantPasajeros:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public restService: RestServiceProvider,
              public loadingCtrl: LoadingController, private toastCtrl: ToastController, private zone: NgZone,
              public cmbScannerProvider: CmbscannerProvider, private platform: Platform, public events: Events) {

                //subscribe to events so we can update our model whenever the connectionState changes
                events.subscribe('connection:changed', (connectionState) => {
                  if(connectionState == 2){
                    this.zone.run(() => {
                      this.connected = true;
                    });
                  }
                  else{
                    this.zone.run(() => {
                      this.connected = false;
                    });
                  }
                });
                platform.ready().then(() => {
                  this.removeBtn = (this.list_data.length > 0) ? false : true;
                  this.cmbScannerProvider.config().then(data => {
                    this.settings= this.cmbScannerProvider.getSettings();
                      this.triggerMode = "crop";
                    this.list_data = data.list;
                    cmbScanner.setActiveStartScanningCallback(scannerState => {
                      if(scannerState){
                        this.zone.run(() => {
                          this.scannerActive = "power";
                        });
                      }
                      else{
                        this.zone.run(() => {
                          this.scannerActive = "barcode";
                        });
                      }
                    });
                    cmbScanner.setResultCallback( result => {
                        // Proceso de escaneo y validación de código QR
                        this.presentLoading();
                        this.procesaDataQR(result.readString);
                       // else if(splittedQR[0] == '4'){
                       //   this.dataVehiculo = {tipo_ticket:splittedQR[0], id_ticket:splittedQR[1], id_reserva:splittedQR[2], id_cruce:splittedQR[9], id_tramo:splittedQR[3], id_vehiculo:splittedQR[4], patente:splittedQR[5], val_seed:splittedQR[10]};
                       //   if(this.cantPasajeros == 'Sin conexión'){
                       //     //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque
                       //
                       //
                       //     if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
                       //       this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
                       //     }
                       //     else{
                       //       this.navCtrl.setRoot(RechazoPage, this.tramo);
                       //     }
                       //   }
                       //   else{
                       //     this.restService.postValTicketVehiculo(this.dataVehiculo).then(dataSP =>{
                       //       console.log(dataSP);
                       //       if(dataSP['name'] === 'HttpErrorResponse'){
                       //         this.presentToast();
                       //         console.log("Existe error");
                       //       }
                       //       else{
                       //         this.resultadoSQL = dataSP[0];
                       //         console.log(this.resultadoSQL);
                       //         //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque
                       //
                       //
                       //         if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
                       //            this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
                       //          }
                       //          else{
                       //            this.navCtrl.setRoot(RechazoPage, this.tramo);
                       //          }
                       //        }
                       //     });
                       //   }
                       // }

                        this.zone.run(() => {
                          if(result.readString){
                          this.cmbScannerProvider.setResultItem(result);
                          this.list_data = this.cmbScannerProvider.data;
                          this.content.scrollToBottom();
                          }
                        });
                    });
                  });
                });
  }

  scanOpenSourceQR(){
   this.barcodeScanner.scan().then((barcodeData) => {
     this.procesaDataQR(barcodeData.text);
    }, (err) => {
      console.log(err);
    });
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }
  //Una vez que entramos a la pantalla, este código se ejecuta
  ionViewDidEnter(){
  this.settings.triggerType = 2;
}
//Cuando se va a enetrar a la pantalla, este código se ejecuta.
  ionViewWillEnter(){
    this.tramo = this.navParams.data;
    console.log(this.tramo.cruce.id_tramo);
        // localStorage.setItem("cruce", JSON.stringify(this.tramo.cruce));
    console.log(this.tramo);
    let id_cruce_tramo:any = {id_cruce:this.tramo.cruce.id_cruce, id_tramo:this.tramo.cruce.id_tramo};
    this.restService.postCantPasajeros(id_cruce_tramo).then(dataSP =>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        this.cantPasajeros = "Sin conexión";
      }
      else{
        let resultado = dataSP[0].pasajeros;
        this.cantPasajeros = resultado + ' de ' + this.tramo.cruce.cupo_pasajeros_maximo;
        console.log(this.cantPasajeros)
        this.max = this.tramo.cruce.cupo_pasajeros_maximo;
        this.current = resultado;
      }
      cmbScanner.registerSDK("oHrl9VmG/SfX7gLccuwXtD+kmR55JoVxhlRfSIhnhvs=");
      this.cmbScannerProvider.cmbScanner.setTriggerType(2).then(result =>{
        //need to update buttons based on the trigger type
        if(result.status){
          this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
        }
      });

      this.platform.ready().then(() => {
        this.cmbScannerProvider.setSettingsItem('previewContainer',[0,0,100,65]);
        this.settings = this.cmbScannerProvider.getSettings();
      });
    });
  }
//Función que crea un 'cargando...' y la llamamos cuando sea necesario
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Validando Ticket...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
//función que crea un mensaje dentro de una ventana negra durante un tiempo, en la parte inferior de la pantalla del celular
  presentToast(tipoError) {
    let mensaje:string;

    if(tipoError == 1){
      mensaje = 'ERROR DE CONEXIÓN: Verifique su conexión Wi-Fi.';
    }
    else{
      mensaje = 'PROBLEMA AL PROCESAR... Continue con embarque.';
    }
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
//función que enciende o apaga la camara con la analítica de escaneo de código QR
  startStopScanner(event){
    this.cmbScannerProvider.cmbScanner.setTriggerType(2).then(result =>{
      //need to update buttons based on the trigger type
      if(result.status){
        this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
      }
    });
    if(this.scannerActive == 'barcode')
      this.cmbScannerProvider.start();
    else
      this.cmbScannerProvider.stop();
  }

  changeTriggerMode(){
    if(this.settings.triggerType == 5){
      this.cmbScannerProvider.cmbScanner.setTriggerType(2).then(result =>{
        //need to update buttons based on the trigger type
        if(result.status){
          this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
        }
      });
    }
    else{
      this.cmbScannerProvider.cmbScanner.setTriggerType(5).then(result =>{
        //need to update buttons based on the trigger type
        console.log(JSON.stringify(result));
        if(result.status){
          this.cmbScannerProvider.setSettingsItem('triggerType',result.trigger);
            let toast = this.toastCtrl.create({
              message: 'Trigger mode changed to Continuous',
              duration: 2000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
        }
      });
    }
  }
  prueba(){
    let dataxxx = '1&36235&7402&1871107392';
    this.navCtrl.setRoot(AprobacionPage, {dataQR:dataxxx, tramo:this.tramo});
  }
  // Proceso de escaneo y validación de código QR
  procesaDataQR(data){
    this.presentLoading();
    this.dataQR = data;
    console.log(JSON.stringify(this.dataQR));
    var splittedQR = this.dataQR.split("&");
     //Si el TIPO_TICKET es igual a 1 o 17 quiere decir que es un ticket de persona, así mismo si es 4 o 20 un ticket de vehículo
    switch(splittedQR[0]){
      case '1':{ //Pasajero
        this.procesaPasajero(splittedQR);
        //Validamos el Ticket
        if(this.cantPasajeros == 'Sin conexión'){

        }
        else{
          this.restService.postValTicket(this.data).then(dataSP =>{
            console.log(JSON.stringify(dataSP));
            this.resultadoSQL = dataSP[0];
            if(dataSP['name'] === 'HttpErrorResponse'){
              this.presentToast(1);
              console.log("Error");
            }
            else if(this.resultadoSQL.resultado == 8){
              this.aprobarRechazarTicketPersona(splittedQR);
            }
            //En caso de perder conexión con el servidor central, ejecutamos este 'else'
            else{
              this.aprobarRechazarTicketPersona(splittedQR);
            }
          });
        }
        break;
      }
      case '4':{ //Vehículo
        this.procesaVehiculo(splittedQR);
        //Validamos Ticket de Vehiculo
        if(this.cantPasajeros == 'Sin conexión'){

        }
        else{
          this.restService.postValTicketVehiculo(this.dataVehiculo).then(dataSP =>{
            console.log(JSON.stringify(dataSP));
            this.resultadoSQL = dataSP[0];
            if(dataSP['name'] === 'HttpErrorResponse'){
              this.presentToast(1);
              console.log('ERROR');
            }
            else{
              if(this.tramo.cruce.id_cruce == this.dataVehiculo.id_cruce && this.resultadoSQL.resultado != 16){
                this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
              }
              else{
                this.navCtrl.setRoot(RechazoPage, this.tramo);
              }
            }
          });
        }
        break;
      }
      case '17':{ //Pasajero Offline
        this.procesaPasajero(splittedQR);
        //Validamos el Ticket
        let compararValSeed = this.validationSeed(+this.data.id_ticket, +this.data.id_cruce, +this.data.tipo_ticket);
        if(this.data.val_seed == compararValSeed.toString()){
          this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
        }
        else{
          this.navCtrl.setRoot(RechazoPage, this.tramo);
        }
        break;
      }
      case '20':{ //vehículo offline
        this.procesaVehiculo(splittedQR);
        //Validamos el Ticket
        let compararValSeed = this.validationSeed(+this.dataVehiculo.id_ticket, +this.dataVehiculo.id_cruce, +this.dataVehiculo.tipo_ticket);
        if(this.dataVehiculo.val_seed == compararValSeed.toString()){
          this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
        }
        else{
          this.navCtrl.setRoot(RechazoPage, this.tramo);
        }
        break;
      }
      default:{
        this.presentToast(2);
        break;
      }
    }
   // else if(splittedQR[0] == '4'){
   //   this.dataVehiculo =
   //   if(this.cantPasajeros == 'Sin conexión'){
   //     //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque
   //
   //
   //     if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
   //       this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
   //     }
   //     else{
   //       this.navCtrl.setRoot(RechazoPage, this.tramo);
   //     }
   //   }
   //   else{
   //     this.restService.postValTicketVehiculo(this.dataVehiculo).then(dataSP =>{
   //       console.log(dataSP);
   //       if(dataSP['name'] === 'HttpErrorResponse'){
   //         this.presentToast();
   //         console.log("Existe error");
   //       }
   //       else{
   //         this.resultadoSQL = dataSP[0];
   //         console.log(this.resultadoSQL);
   //         //Tomamos la fecha del cruce y la manipulamos para quitar la hora de la variable, y así poder compararla con la fecha del codigo QR de la Tarjeta de Embarque
   //
   //
   //         if(this.tramo.cruce.id_tramo == this.data.id_tramo && this.navParams.data.cruce.id_cruce == this.data.id_cruce){
   //            this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
   //          }
   //          else{
   //            this.navCtrl.setRoot(RechazoPage, this.tramo);
   //          }
   //        }
   //     });
   //   }
   // }
  }

  procesaPasajero(dataQRpasajero){
    this.data = {tipo_ticket:dataQRpasajero[0], id_ticket:dataQRpasajero[1], id_cruce:dataQRpasajero[2], id_tramo:this.tramo.cruce.id_tramo, val_seed:dataQRpasajero[3]};
    console.log(JSON.stringify(this.data));
    return this.data;
  }

  procesaVehiculo(dataQRvehiculo){
    this.dataVehiculo = {tipo_ticket:dataQRvehiculo[0], id_ticket:dataQRvehiculo[1], id_cruce:dataQRvehiculo[2], id_tramo:this.tramo.cruce.id_tramo, val_seed:dataQRvehiculo[3]};
    console.log(JSON.stringify(this.dataVehiculo));
    return this.dataVehiculo;
  }

  //Validamos los datos del tramo seleccionado vs la data del QR de pasajero
  aprobarRechazarTicketPersona(splittedQR){
    if(this.tramo.cruce.id_cruce == this.data.id_cruce && this.resultadoSQL.resultado != 16){
      this.navCtrl.setRoot(AprobacionPage, {dataQR:splittedQR, tramo:this.tramo});
    }
    else{
      this.navCtrl.setRoot(RechazoPage, this.tramo);
    }
    console.log("Validación exitosa de ticket");
  }
  validationSeed(id_ticket:number, id_cruce:number, tipo_ticket:number){
    var valSeed;
    if(tipo_ticket = 17){
      valSeed = ( ( ( (id_ticket - 17) * 22 - id_cruce) * (id_ticket - (tipo_ticket * 7) ) ) / (id_cruce + 11) );
    }
    else{
      valSeed = ( ( ( (id_ticket - 13) * 19 - id_cruce) * (id_ticket - (tipo_ticket * 17) ) ) / (id_cruce + 23) );
    }
    return Math.trunc(valSeed);
  }

}
