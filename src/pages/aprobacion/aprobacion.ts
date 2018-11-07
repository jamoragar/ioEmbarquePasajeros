import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//importamos paginas a redireccionar
import { ScanQrPage } from "../scan-qr/scan-qr";
//Importamos Servicios APIRest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@IonicPage()
@Component({
  selector: 'page-aprobacion',
  templateUrl: 'aprobacion.html',
})
export class AprobacionPage {
  tramo:any;
  dataQR:any;
  titulo:string;
  resultadoSP:any;

  data = {id_ticket:'', id_cruce:'', id_tramo:'', val_seed:'', id_usuario:''};
  dataVehiculo = {id_ticket:'', id_cruce:'', id_tramo:'', val_seed:'', id_usuario:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restServices: RestServiceProvider, private toastCtrl: ToastController) {
                this.tramo = this.navParams.data.tramo;
                this.dataQR = this.navParams.data.dataQR;
                console.log('Tramo: '+JSON.stringify(this.tramo));
                console.log('DataQR: '+JSON.stringify(this.dataQR));
                console.log('Switch: '+JSON.stringify(this.navParams.data.switch));
                
                //Reproducción de audio de aprobación al entrar a la página.
                let audio = new Audio();
                audio.src = "assets/audio/pasajero_embarcado.mp3";
                audio.load();
                audio.play();
  }

  ionViewDidEnter(){
    if(this.dataQR[0] == 1 || this.dataQR[0] == 17){
      this.titulo = 'PASAJERO';
    }
    else{
      this.titulo = 'VEHÍCULO'
    }
    setTimeout(() =>{
      this.navCtrl.setRoot(ScanQrPage, {tramo:this.tramo, switch: this.navParams.data.switch});

    },2250);
  }
  //Inovocamos al procedimiento almacenado al momento de cargar la pagina
  ionViewWillEnter(){
  if(this.dataQR[0] == '1'){
    this.data = {id_ticket:this.dataQR[1], id_cruce:this.dataQR[2], id_tramo:this.tramo.cruce.id_tramo ,val_seed:this.dataQR[3], id_usuario:this.tramo.id_usuario.id_usuario};

    this.restServices.postUtilTicket(this.data).then(dataSP=>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        //guardar datos para invocar procedimiento almacenado al iniciar sesion.



      }
    });
  }
  if(this.dataQR[0] == '4'){
    this.dataVehiculo = {id_ticket:this.dataQR[1], id_cruce:this.dataQR[2], id_tramo:this.tramo.cruce.id_tramo , val_seed:this.dataQR[3], id_usuario:this.tramo.id_usuario.id_usuario};
    this.restServices.postUtilTicketVehiculo(this.dataVehiculo).then(dataSP=>{
      if(dataSP['name'] === 'HttpErrorResponse'){
        console.log("No hay conexión");
        //guardar datos para invocar procedimiento almacenado al iniciar sesion.
        }
      });
    }
    if(this.dataQR[0] == '17' || this.dataQR[0] == '20'){
      this.presentToast();
    }
  }
  presentToast() {
    let mensaje:string;
    let toast = this.toastCtrl.create({
      message: 'ATENCIÓN: Ticket generado de manera offline. Es válido, pero no existe reserva asociada.',
      duration: 1600,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  changeSwitch(){
    this.navParams.data.switch = false;
  }
}
