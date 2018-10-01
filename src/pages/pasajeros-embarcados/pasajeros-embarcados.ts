import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
//Importamos Servicios APIRest
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@IonicPage()
@Component({
  selector: 'page-pasajeros-embarcados',
  templateUrl: 'pasajeros-embarcados.html',
})
export class PasajerosEmbarcadosPage {

  tramo:any;
  pasajeros:any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,
              public restService: RestServiceProvider, public loadingCtrl: LoadingController) {
                if(this.navCtrl.getActive().data.cruce){
                  this.presentLoading();
                  this.tramo = this.navCtrl.getActive().data;
                  let id_cruce_tramo:any = {id_cruce:this.tramo.cruce.id_cruce, id_tramo:this.tramo.cruce.id_tramo};
                  this.restService.postListaPasajerosEmbarcados(id_cruce_tramo).then(dataSP =>{
                    this.pasajeros = dataSP;
                    console.log(this.pasajeros);
                  });
                }
                else{
                  console.log("Tramo aun no seleccionado");
                }
  }


  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando Lista de Pasajeros...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1600);
  }
  ionViewWillEnter(){
    this.menu.enable(false);
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
