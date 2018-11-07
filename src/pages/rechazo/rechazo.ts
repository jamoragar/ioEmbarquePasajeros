import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//importamos Pagina para seguir escaneando Pasajeros
import { ScanQrPage } from "../scan-qr/scan-qr";



@IonicPage()
@Component({
  selector: 'page-rechazo',
  templateUrl: 'rechazo.html',
})
export class RechazoPage {
  tramo:any;
  dataQR:any;
  resultado:number;
  titulo:string;
  motivo:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
                this.tramo = this.navParams.data.tramo;
                this.resultado = this.navParams.data.resultado;
                console.log("Resultado: "+this.resultado);
                this.dataQR = this.navParams.data.dataQR;
                console.log(this.tramo);

                //Reproducción de audio de rechazo al entrar a la página.
                let audio = new Audio();
                audio.src = "assets/audio/datos_incorrectos.mp3";
                audio.load();
                audio.play();
  }
  ionViewDidEnter(){
    if(this.dataQR[0] == 1 || this.dataQR[0] == 17){
      this.titulo = 'PASAJERO';
      this.procesaMotivo(this.resultado);
    }
    else{
      this.titulo = 'VEHÍCULO';
      this.procesaMotivo(this.resultado);
    }
  }
  siguientePasajero(){
    this.navCtrl.setRoot(ScanQrPage, this.tramo);
  }
  procesaMotivo(codigoResultado){
    if(codigoResultado == 0){
      this.motivo = 'TICKET INVÁLIDO.';
    }
    else if(codigoResultado == 16){
      this.motivo = 'TICKET YA UTILIZADO';
    }
    else{
      this.motivo = 'PASAJE VENDIDO DE MANERA OFF-LINE';
    }
    return this.motivo;
  }
  changeSwitch(){
    this.navParams.data.switch = false;
  }

}
