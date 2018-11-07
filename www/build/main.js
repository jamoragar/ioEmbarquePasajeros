webpackJsonp([6],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AprobacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_qr_scan_qr__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//importamos paginas a redireccionar

//Importamos Servicios APIRest

var AprobacionPage = /** @class */ (function () {
    function AprobacionPage(navCtrl, navParams, restServices, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restServices = restServices;
        this.toastCtrl = toastCtrl;
        this.data = { id_ticket: '', id_cruce: '', id_tramo: '', val_seed: '', id_usuario: '' };
        this.dataVehiculo = { id_ticket: '', id_cruce: '', id_tramo: '', val_seed: '', id_usuario: '' };
        this.tramo = this.navParams.data.tramo;
        this.dataQR = this.navParams.data.dataQR;
        console.log('Tramo: ' + JSON.stringify(this.tramo));
        console.log('DataQR: ' + JSON.stringify(this.dataQR));
        console.log('Switch: ' + JSON.stringify(this.navParams.data.switch));
        //Reproducción de audio de aprobación al entrar a la página.
        var audio = new Audio();
        audio.src = "assets/audio/pasajero_embarcado.mp3";
        audio.load();
        audio.play();
    }
    AprobacionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.dataQR[0] == 1 || this.dataQR[0] == 17) {
            this.titulo = 'PASAJERO';
        }
        else {
            this.titulo = 'VEHÍCULO';
        }
        setTimeout(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scan_qr_scan_qr__["a" /* ScanQrPage */], { tramo: _this.tramo, switch: _this.navParams.data.switch });
        }, 2250);
    };
    //Inovocamos al procedimiento almacenado al momento de cargar la pagina
    AprobacionPage.prototype.ionViewWillEnter = function () {
        if (this.dataQR[0] == '1') {
            this.data = { id_ticket: this.dataQR[1], id_cruce: this.dataQR[2], id_tramo: this.tramo.cruce.id_tramo, val_seed: this.dataQR[3], id_usuario: this.tramo.id_usuario.id_usuario };
            this.restServices.postUtilTicket(this.data).then(function (dataSP) {
                if (dataSP['name'] === 'HttpErrorResponse') {
                    console.log("No hay conexión");
                    //guardar datos para invocar procedimiento almacenado al iniciar sesion.
                }
            });
        }
        if (this.dataQR[0] == '4') {
            this.dataVehiculo = { id_ticket: this.dataQR[1], id_cruce: this.dataQR[2], id_tramo: this.tramo.cruce.id_tramo, val_seed: this.dataQR[3], id_usuario: this.tramo.id_usuario.id_usuario };
            this.restServices.postUtilTicketVehiculo(this.dataVehiculo).then(function (dataSP) {
                if (dataSP['name'] === 'HttpErrorResponse') {
                    console.log("No hay conexión");
                    //guardar datos para invocar procedimiento almacenado al iniciar sesion.
                }
            });
        }
        if (this.dataQR[0] == '17' || this.dataQR[0] == '20') {
            this.presentToast();
        }
    };
    AprobacionPage.prototype.presentToast = function () {
        var mensaje;
        var toast = this.toastCtrl.create({
            message: 'ATENCIÓN: Ticket generado de manera offline. Es válido, pero no existe reserva asociada.',
            duration: 1600,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AprobacionPage.prototype.changeSwitch = function () {
        this.navParams.data.switch = false;
    };
    AprobacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-aprobacion',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/aprobacion/aprobacion.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>PASAJERO VALIDADO</ion-title>\n    <button ion-button icon-only menuToggle end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-header><ion-icon name="checkmark"></ion-icon></ion-card-header>\n    <ion-card-content>\n      <ion-card-title><strong>{{titulo}} EMBARCADO</strong></ion-card-title>\n      <ion-list>\n        <ion-item>\n          <p style="font-size: 1.1em;" align="center">\n            {{titulo}}\n          </p>\n          <br>\n          <p style="font-size: 1.1em;" align="center">\n            EMBARCADO CON ÉXITO\n          </p>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n  <ion-item style="bottom:0; position:absolute;">\n    <button ion-button block color="danger"\n            style="height:6rem; border-radius: 8px; font-size: 2rem;"\n            (click)="changeSwitch()">Detener Escaneo Continuo</button>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/aprobacion/aprobacion.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__["a" /* RestServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__["a" /* RestServiceProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _d || Object])
    ], AprobacionPage);
    return AprobacionPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=aprobacion.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RechazoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_qr_scan_qr__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//importamos Pagina para seguir escaneando Pasajeros

var RechazoPage = /** @class */ (function () {
    function RechazoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tramo = this.navParams.data.tramo;
        this.resultado = this.navParams.data.resultado;
        console.log("Resultado: " + this.resultado);
        this.dataQR = this.navParams.data.dataQR;
        console.log(this.tramo);
        //Reproducción de audio de rechazo al entrar a la página.
        var audio = new Audio();
        audio.src = "assets/audio/datos_incorrectos.mp3";
        audio.load();
        audio.play();
    }
    RechazoPage.prototype.ionViewDidEnter = function () {
        if (this.dataQR[0] == 1 || this.dataQR[0] == 17) {
            this.titulo = 'PASAJERO';
            this.procesaMotivo(this.resultado);
        }
        else {
            this.titulo = 'VEHÍCULO';
            this.procesaMotivo(this.resultado);
        }
    };
    RechazoPage.prototype.siguientePasajero = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scan_qr_scan_qr__["a" /* ScanQrPage */], this.tramo);
    };
    RechazoPage.prototype.procesaMotivo = function (codigoResultado) {
        if (codigoResultado == 0) {
            this.motivo = 'TICKET INVÁLIDO.';
        }
        else if (codigoResultado == 16) {
            this.motivo = 'TICKET YA UTILIZADO';
        }
        else {
            this.motivo = 'PASAJE VENDIDO DE MANERA OFF-LINE';
        }
        return this.motivo;
    };
    RechazoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-rechazo',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/rechazo/rechazo.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>PASAJERO RECHAZADO</ion-title>\n    <button ion-button icon-only menuToggle end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-header><ion-icon name="close"></ion-icon></ion-card-header>\n    <ion-card-content>\n      <ion-card-title><strong>DATOS INVALIDOS</strong></ion-card-title>\n      <ion-list>\n        <ion-item>\n          <p style="font-size: 1.1em;" align="center">\n            <b>{{titulo}}</b> NO PUEDE<br>EMBARCAR!\n          </p>\n          <br><br>\n          <p style="font-size: 1em;" align="center">\n            MOTIVO:\n          </p>\n          <br>\n          <p align="center" style="font-size: 0.9em;">\n            <b>{{motivo}}</b><br><br>\n            REMITIR PASAJERO A<br>TERMINAL.\n          </p>\n        </ion-item>\n        <ion-item>\n          <br><br>\n          <button style="height:8rem; transition:none; font-size:2.4rem; border-radius: 30px;"\n                  ion-button full color="Broom"\n                  (click)="siguientePasajero()">SIGUIENTE PASAJERO</button>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n  <ion-item style="bottom:0; position:absolute;">\n      <button ion-button block color="danger"\n              style="height:6rem; border-radius: 8px; font-size: 2rem;"\n              (click)="changeSwitch()">Detener Escaneo Continuo</button>\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/rechazo/rechazo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], RechazoPage);
    return RechazoPage;
}());

//# sourceMappingURL=rechazo.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AyudaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AyudaPage = /** @class */ (function () {
    function AyudaPage(navCtrl, navParams, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.slides = [
            {
                title: "Bienvenido!!!",
                description: "Esta <b>aplicación</b> nos ayudará a embarcar pasajeros de forma mas segura y eficiente! Corroborando información del tramo seleccionado, con la tarjeta de embarque del pasajero. Y para los(las) compatriotas, su  Cedula de identidad (Solo si posee código QR).",
                image: "assets/imgs/ica-slidebox-img-1.png",
            },
            {
                title: "¿Que hace esta app?",
                description: "<b>Embarque de Pasajeros</b> Pone a disposición del operador, la elección del tramo con el que debe trabajar para proceder a embarcar a los pasajeros de ese tramo. Esto lo hace a travez de la de la camara del celular, que es usada como scanner de codigos QR (El cuadrado negro con puntos que se ve en la Tarjeta de Embarque). A su vez, nos provee la lista de pasajeros por embarcar, y nos permite saber si esa Tarjeta de Embarque corresponde al tramo seleccionado, si es una Tarjeta Valida, si corresponde al tramo seleccionado y los datos del pasajero.",
                image: "assets/imgs/ica-slidebox-img-2.png",
            },
            {
                title: "¿Para que me sirve?",
                description: "Esta aplicación nos ayudará a corroborar la información de la Tarjeta de Embarque junto con los datos del pasajero, evitando así, falsificaciones, equivocaciones y posibles confusiones que podamos tener al momento de embarcar a un pasajero!",
                image: "assets/imgs/ica-slidebox-img-3.png",
            }
        ];
    }
    AyudaPage.prototype.saltar_ayuda = function () {
        this.navCtrl.pop();
    };
    AyudaPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    AyudaPage.prototype.ionViewWillLeave = function () {
        this.menu.enable(true);
    };
    AyudaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-ayuda',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/ayuda/ayuda.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Ayuda</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-slides pager>\n\n    <!-- Código para crear slides -->\n      <ion-slide *ngFor="let slide of slides">\n        <ion-toolbar>\n\n          <ion-buttons end>\n            <button ion-button color="primary"\n                    (click)="saltar_ayuda()">Saltar</button>\n          </ion-buttons>\n\n        </ion-toolbar>\n\n        <img [src]="slide.image" class="slide-image"/>\n        <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n        <p [innerHTML]="slide.description"></p>\n      </ion-slide>\n      <!-- Fin del ngFor -->\n\n      <!-- Ultimo Slide -->\n      <ion-slide>\n        <ion-toolbar>\n        </ion-toolbar>\n\n        <img src="assets/imgs/ica-slidebox-img-4.png" class="slide-image"/>\n        <h2 class="slide-title">¿Listo para empezar?</h2>\n\n        <button ion-button large clear icon-right color="primary"\n                (click)="saltar_ayuda()">\n          Continuar\n          <ion-icon name="arrow-forward"></ion-icon>\n        </button>\n\n      </ion-slide>\n      <!-- Fin del último slide -->\n\n    </ion-slides>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/ayuda/ayuda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
    ], AyudaPage);
    return AyudaPage;
}());

//# sourceMappingURL=ayuda.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__seleccion_seleccion__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service_rest_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_storage_service_storage_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//Importamos Página Inicial

//Importamos el servicio Rest


//importamos plugin a utilizar

var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, menu, restService, http, toastCtrl, loadingCtrl, storageService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.restService = restService;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storageService = storageService;
        this.credenciales = { username: '', password: '' };
        this.fechas = { fecha: '' }; //Objeto a Enviar al Servicio Rest para que lo consuma el metodo.
    }
    LoginPage.prototype.loginApp = function () {
        var password = (__WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5__["Md5"].hashStr(this.credenciales.password).toString()).toUpperCase();
        for (var i = 0; i < this.usersSQL.length; i++) {
            if (this.credenciales.username == this.usersSQL[i].username && password == this.usersSQL[i][""]) {
                console.log("usuario encontrado");
                this.presentLoading(i);
                break;
            }
            else if (i == (this.usersSQL.length - 1)) {
                this.presentToast();
            }
        }
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.getUsers();
        this.infoViaje();
    };
    LoginPage.prototype.getUsers = function () {
        var _this = this;
        this.restService.getUsers()
            .then(function (data) {
            if (data['name'] === 'HttpErrorResponse') {
                console.log("No Hay conexión");
                _this.storageService.cargar_usuariosSQL();
                _this.usersSQL = _this.storageService.UsersSQL;
                console.log(_this.usersSQL);
            }
            else {
                _this.usersSQL = data;
                console.log(_this.usersSQL);
                _this.storageService.UsersSQL = _this.usersSQL;
                _this.storageService.guardar_usuariosSQL();
            }
        });
    };
    LoginPage.prototype.infoViaje = function () {
        var _this = this;
        var fechaActual = new Date().toLocaleDateString();
        var fechaSplitted = fechaActual.split("/");
        var fechaNueva = fechaSplitted[2] + "-" + fechaSplitted[1] + "-" + fechaSplitted[0];
        this.fechas.fecha = fechaNueva.toString();
        console.log(fechaNueva);
        this.restService.postDate(this.fechas).then(function (data) {
            if (data['name'] === 'HttpErrorResponse') {
                console.log("No hay conexión");
                _this.storageService.cargar_Tramos();
                _this.cruceSQL = _this.storageService.TramosSQL;
                console.log(_this.cruceSQL);
            }
            else {
                _this.cruceSQL = data;
                console.log(_this.cruceSQL);
                _this.storageService.TramosSQL = _this.cruceSQL;
                _this.storageService.guardar_Tramos();
            }
        });
    };
    LoginPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Usuario no encontrado. Verifique nombre de Usuario y/o Contraseña Incorrecta.',
            duration: 3500,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage.prototype.presentLoading = function (i) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__seleccion_seleccion__["a" /* SeleccionPage */], { id_usuario: _this.usersSQL[i].id_usuario, username: _this.usersSQL[i].nombre, usersecondname: _this.usersSQL[i].apellido });
        }, 1200);
        setTimeout(function () {
            loading.dismiss();
        }, 1400);
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menu.enable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.menu.enable(true);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/login/login.html"*/'<ion-content class="background">\n  <ion-card>\n    <form (submit)="loginApp()">\n      <ion-card-header>\n        <div class="logo"></div>\n      </ion-card-header>\n      <ion-card-content>\n\n        <ion-list no-line>\n          <ion-item>\n            <ion-input [(ngModel)]="credenciales.username" autocapitalize="off" name="username" type="text" placeholder="Nombre de Usuario"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input [(ngModel)]="credenciales.password" autocapitalize="off" name="password" type="password" placeholder="Contraseña"></ion-input>\n          </ion-item>\n        </ion-list>\n        <button ion-button block outline color="light" type="submit">Ingresar</button>\n      </ion-card-content>\n    </form>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4__providers_rest_service_rest_service__["a" /* RestServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasajerosEmbarcadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service_rest_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Importamos Servicios APIRest

var PasajerosEmbarcadosPage = /** @class */ (function () {
    function PasajerosEmbarcadosPage(navCtrl, navParams, menu, restService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.pasajeros = null;
        if (this.navCtrl.getActive().data.cruce) {
            this.presentLoading();
            this.tramo = this.navCtrl.getActive().data;
            var id_cruce_tramo = { id_cruce: this.tramo.cruce.id_cruce, id_tramo: this.tramo.cruce.id_tramo };
            this.restService.postListaPasajerosEmbarcados(id_cruce_tramo).then(function (dataSP) {
                _this.pasajeros = dataSP;
                console.log(_this.pasajeros);
            });
        }
        else {
            console.log("Tramo aun no seleccionado");
        }
    }
    PasajerosEmbarcadosPage.prototype.presentLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Cargando Lista de Pasajeros...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 1600);
    };
    PasajerosEmbarcadosPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    PasajerosEmbarcadosPage.prototype.ionViewWillLeave = function () {
        this.menu.enable(true);
    };
    PasajerosEmbarcadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pasajeros-embarcados',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/pasajeros-embarcados/pasajeros-embarcados.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Pasajeros Embarcados</ion-title>\n    <button ion-button icon-only menuToggle end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <ion-item *ngIf="pasajeros == null">\n      <h1>Aún no ha seleccionado<br>un tramo.</h1>\n      <br>\n      <h2>Debe seleccionar un tramo, para<br>poder ver la lista de pasajeros<br>embarcados.</h2>\n    </ion-item>\n  </ion-card>\n  <ion-card *ngIf="pasajeros != null">\n    <ion-card-title><strong>Pasajeros Embarcados</strong></ion-card-title>\n    <ion-list>\n      <ion-item *ngFor="let pasajero of pasajeros; let i=index">\n        <b>{{i + 1}}) </b>\n        <b>Nombre</b>: {{pasajero.nombre}} {{pasajero.apellido}}\n        <br>\n        <b>ID de Reserva</b>: {{pasajero.id_reserva}}\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/pasajeros-embarcados/pasajeros-embarcados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], PasajerosEmbarcadosPage);
    return PasajerosEmbarcadosPage;
}());

//# sourceMappingURL=pasajeros-embarcados.js.map

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 126;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/aprobacion/aprobacion.module": [
		298,
		5
	],
	"../pages/ayuda/ayuda.module": [
		299,
		4
	],
	"../pages/login/login.module": [
		300,
		3
	],
	"../pages/pasajeros-embarcados/pasajeros-embarcados.module": [
		301,
		2
	],
	"../pages/rechazo/rechazo.module": [
		302,
		1
	],
	"../pages/verificacion/verificacion.module": [
		303,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResumenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viajes_viajes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_qr_scan_qr__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Importamos Paginas a usar


var ResumenPage = /** @class */ (function () {
    function ResumenPage(navCtrl, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.tramo = this.navParams.data;
        console.log(this.tramo);
    }
    ResumenPage.prototype.viajeCorrecto = function () {
        this.LoadingConfirmacion();
    };
    ResumenPage.prototype.viajeIncorrecto = function () {
        this.presentLoading();
    };
    ResumenPage.prototype.presentLoading = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Espere un momento...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__viajes_viajes__["a" /* ViajesPage */], _this.tramo.id_usuario);
        }, 1500);
        setTimeout(function () {
            loading.dismiss();
        }, 2000);
    };
    ResumenPage.prototype.LoadingConfirmacion = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__scan_qr_scan_qr__["a" /* ScanQrPage */], { tramo: _this.tramo });
        }, 1300);
        setTimeout(function () {
            loading.dismiss();
        }, 1300);
    };
    ResumenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-resumen',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/resumen/resumen.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Resumen Viaje Elegido</ion-title>\n    <button ion-button icon-only menuToggle end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding no-bounce>\n  <ion-list no-border style="margin-top:0;">\n\n    <ion-item>\n      <ion-icon name=\'calendar\' item-start></ion-icon>\n      Fecha:\n      <ion-note item-end>\n        {{ tramo.cruce.horario_cruce | date: "dd/MM/yyyy" }}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'clock\' item-start></ion-icon>\n      Hora:\n      <ion-note item-end>\n      {{ tramo.cruce.horario_cruce | date: "h:mma":\'+0000\' }}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'boat\' item-start></ion-icon>\n      Nave:\n      <ion-note item-end>\n      {{ tramo.cruce.nombre_nave }}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'locate\' item-start></ion-icon>\n      Origen:\n      <ion-note item-end>\n      {{ tramo.origen }}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'map\' item-start></ion-icon>\n      Destino:\n      <ion-note item-end>\n      {{ tramo.destino }}\n      </ion-note>\n    </ion-item>\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title>Este viaje es correcto?</ion-card-title>\n        <button ion-button block style="font-size:2rem; height:6rem;"\n                color="Broom"\n                (click)="viajeCorrecto()">Confirmar\n                <ion-icon name="checkmark-circle"></ion-icon>\n        </button>\n        <button ion-button block style="font-size:2rem; height:6rem; margin-top:1rem;"\n                color="danger"\n                (click)="viajeIncorrecto()">CANCELAR\n                <ion-icon name="close-circle"></ion-icon>\n\n        </button>\n      </ion-card-content>\n    </ion-card>\n\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/resumen/resumen.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]) === "function" && _c || Object])
    ], ResumenPage);
    return ResumenPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=resumen.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RestServiceProvider = /** @class */ (function () {
    // apiURL = 'http://localhost:24500';
    function RestServiceProvider(http) {
        this.http = http;
        //Ip Local servidor Tabsa
        // apiURL = 'http://192.168.50.185:24500';
        this.apiURL = 'http://ventas.tabsa.cl:24500';
    }
    RestServiceProvider.prototype.getUsers = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiURL + '/Users').subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.loginUsers = function (credenciales) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/Login', credenciales).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestServiceProvider.prototype.getSitios = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiURL + '/Sitios').subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestServiceProvider.prototype.postDate = function (fecha) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/Cruces', fecha).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.postValTicket = function (ticket) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/valTicket', ticket).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.postValTicketVehiculo = function (ticketVehiculo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/valTicketVehiculo', ticketVehiculo).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.postUtilTicket = function (ticketWuser) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/utilTicket', ticketWuser).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.postUtilTicketVehiculo = function (ticketUserVehiculo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/utilTicketVehiculo', ticketUserVehiculo).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.postCantPasajeros = function (id_cruce_tramo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/cantPasajeros', id_cruce_tramo).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider.prototype.postListaPasajeros = function (id_cruce_tramo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/pendientePasajeros', id_cruce_tramo).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestServiceProvider.prototype.postListaPasajerosEmbarcados = function (id_cruce_tramo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/embarcadosPasajeros', id_cruce_tramo).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestServiceProvider.prototype.postBuscarReserva = function (criterioBusqueda) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiURL + '/buscarReserva', criterioBusqueda).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    RestServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RestServiceProvider);
    return RestServiceProvider;
}());

//# sourceMappingURL=rest-service.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasajerosPendientesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service_rest_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Importamos Servicios APIRest

var PasajerosPendientesPage = /** @class */ (function () {
    function PasajerosPendientesPage(navCtrl, navParams, menu, restService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.pasajeros = null;
        if (this.navCtrl.getActive().data.cruce) {
            this.presentLoading();
            this.tramo = this.navCtrl.getActive().data;
            var id_cruce_tramo = { id_cruce: this.tramo.cruce.id_cruce, id_tramo: this.tramo.cruce.id_tramo };
            this.restService.postListaPasajeros(id_cruce_tramo).then(function (dataSP) {
                _this.pasajeros = dataSP;
                console.log(_this.pasajeros);
            });
        }
        else {
            console.log("Tramo aun no seleccionado");
        }
    }
    PasajerosPendientesPage.prototype.presentLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Cargando Lista de Pasajeros...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 1600);
    };
    PasajerosPendientesPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    PasajerosPendientesPage.prototype.ionViewWillLeave = function () {
        this.menu.enable(true);
    };
    PasajerosPendientesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pasajeros-pendientes',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/pasajeros-pendientes/pasajeros-pendientes.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Lista de Pasajeros</ion-title>\n    <button ion-button icon-only menuToggle end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <ion-item *ngIf="pasajeros == null">\n      <h1>Aún no ha seleccionado<br>un tramo.</h1>\n      <br>\n      <h2>Debe seleccionar un tramo, para<br>poder ver la lista de pasajeros<br>por embarcar.</h2>\n    </ion-item>\n  </ion-card>\n  <ion-card *ngIf="pasajeros != null">\n    <ion-card-title><strong>Pasajeros por Embarcar</strong></ion-card-title>\n    <ion-list>\n      <ion-item *ngFor="let pasajero of pasajeros; let i=index">\n        <b>{{i + 1}}) </b>\n        <b>Nombre</b>: {{pasajero.nombre}} {{pasajero.apellido}}\n        <br>\n        <b>ID de Reserva</b>: {{pasajero.id_reserva}}\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/pasajeros-pendientes/pasajeros-pendientes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], PasajerosPendientesPage);
    return PasajerosPendientesPage;
}());

//# sourceMappingURL=pasajeros-pendientes.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the VerificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VerificacionPage = /** @class */ (function () {
    function VerificacionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    VerificacionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerificacionPage');
    };
    VerificacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-verificacion',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/verificacion/verificacion.html"*/'<!--\n  Generated template for the VerificacionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Verificacion</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/verificacion/verificacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], VerificacionPage);
    return VerificacionPage;
}());

//# sourceMappingURL=verificacion.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(238);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_seleccion_seleccion__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_viajes_viajes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_resumen_resumen__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_verificacion_verificacion__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_scan_qr_scan_qr__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_rechazo_rechazo__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_aprobacion_aprobacion__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_pasajeros_pendientes_pasajeros_pendientes__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_pasajeros_embarcados_pasajeros_embarcados__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_ayuda_ayuda__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_barcode_scanner__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_storage__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_storage_service_storage_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_rest_service_rest_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_angular_svg_round_progressbar__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_angular_svg_round_progressbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_angular_svg_round_progressbar__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//Pantallas de la App











//Plugins



//providers


//Importando Modulo

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_seleccion_seleccion__["a" /* SeleccionPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_viajes_viajes__["a" /* ViajesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_resumen_resumen__["a" /* ResumenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_verificacion_verificacion__["a" /* VerificacionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_scan_qr_scan_qr__["a" /* ScanQrPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_rechazo_rechazo__["a" /* RechazoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_aprobacion_aprobacion__["a" /* AprobacionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_pasajeros_pendientes_pasajeros_pendientes__["a" /* PasajerosPendientesPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_pasajeros_embarcados_pasajeros_embarcados__["a" /* PasajerosEmbarcadosPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_ayuda_ayuda__["a" /* AyudaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/aprobacion/aprobacion.module#AprobacionPageModule', name: 'AprobacionPage', segment: 'aprobacion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ayuda/ayuda.module#AyudaPageModule', name: 'AyudaPage', segment: 'ayuda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pasajeros-embarcados/pasajeros-embarcados.module#PasajerosEmbarcadosPageModule', name: 'PasajerosEmbarcadosPage', segment: 'pasajeros-embarcados', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rechazo/rechazo.module#RechazoPageModule', name: 'RechazoPage', segment: 'rechazo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/verificacion/verificacion.module#VerificacionPageModule', name: 'VerificacionPage', segment: 'verificacion', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_20__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23_angular_svg_round_progressbar__["RoundProgressModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_seleccion_seleccion__["a" /* SeleccionPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_viajes_viajes__["a" /* ViajesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_resumen_resumen__["a" /* ResumenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_verificacion_verificacion__["a" /* VerificacionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_scan_qr_scan_qr__["a" /* ScanQrPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_rechazo_rechazo__["a" /* RechazoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_aprobacion_aprobacion__["a" /* AprobacionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_pasajeros_pendientes_pasajeros_pendientes__["a" /* PasajerosPendientesPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_pasajeros_embarcados_pasajeros_embarcados__["a" /* PasajerosEmbarcadosPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_ayuda_ayuda__["a" /* AyudaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6_ts_md5_dist_md5__["Md5"],
                __WEBPACK_IMPORTED_MODULE_22__providers_rest_service_rest_service__["a" /* RestServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_storage_service_storage_service__["a" /* StorageServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_storage__["a" /* IonicStorageModule */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_seleccion_seleccion__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_ayuda_ayuda__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_pasajeros_pendientes_pasajeros_pendientes__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_pasajeros_embarcados_pasajeros_embarcados__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_scan_qr_scan_qr__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_storage_service_storage_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_rest_service_rest_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//plugins a utilizar



var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, storage, storageService, restServices) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.storageService = storageService;
        this.restServices = restServices;
        this.Ayuda = __WEBPACK_IMPORTED_MODULE_6__pages_ayuda_ayuda__["a" /* AyudaPage */];
        this.PasajerosPendientes = __WEBPACK_IMPORTED_MODULE_7__pages_pasajeros_pendientes_pasajeros_pendientes__["a" /* PasajerosPendientesPage */];
        this.PasajerosEmbarcados = __WEBPACK_IMPORTED_MODULE_8__pages_pasajeros_embarcados_pasajeros_embarcados__["a" /* PasajerosEmbarcadosPage */];
        platform.ready().then(function () {
            _this.storageService.cargar_storage();
            if (_this.storageService.ajustes.mostrar_seleccionTramo) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_scan_qr_scan_qr__["a" /* ScanQrPage */];
            }
            else {
                if (_this.storageService.ajustes.mostrar_login) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_seleccion_seleccion__["a" /* SeleccionPage */];
                }
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.abrirPagina = function (pagina) {
        this.nav.push(pagina);
        this.menuCtrl.close();
    };
    MyApp.prototype.logOut = function () {
        localStorage.removeItem("ajustes");
        localStorage.removeItem("usuario");
        localStorage.removeItem("cruce");
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
        this.menuCtrl.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/app/app.html"*/'<ion-menu [content]="content" persistent="true">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menú</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item (click)="abrirPagina(PasajerosPendientes)">\n        1.- Pasajeros por Embarcar\n      </button>\n      <button ion-item (click)="abrirPagina(PasajerosEmbarcados)">\n        2.- Pasajeros Embarcados\n      </button>\n      <button ion-item (click)="abrirPagina(Ayuda)">\n        3.- Ayuda\n      </button>\n      <button ion-item (click)="logOut()">\n        4.- Cerrar Sesión\n      </button>\n    </ion-list>\n  </ion-content>\n\n  <ion-footer>\n    <ion-toolbar>\n      <ion-title>Versión: 2.1.0</ion-title>\n    </ion-toolbar>\n  </ion-footer>\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content></ion-nav>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_11__providers_storage_service_storage_service__["a" /* StorageServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_rest_service_rest_service__["a" /* RestServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanQrPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rechazo_rechazo__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aprobacion_aprobacion__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Importamos el plugin para Escanear Codigo QR

// Importamos Servicio Rest para validacion de codigo QR

// Importamos siguiente pantalla


//importamos el scanner nuevo de qr
// import { CmbscannerProvider, Settings } from '../../providers/cmbscanner/cmbscanner';
// declare var cmbScanner:any;
var ScanQrPage = /** @class */ (function () {
    function ScanQrPage(navCtrl, navParams, barcodeScanner, restService, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.stroke = 12;
        this.radius = 80;
        this.semicircle = false;
        this.rounded = false;
        this.responsive = false;
        this.clockwise = true;
        this.color = '#2eb355';
        this.background = '#eaeaea';
        this.duration = 800;
        this.animation = 'easeOutCubic';
        this.animationDelay = 0;
        this.animations = [];
        this.gradient = false;
        this.realCurrent = 0;
        this.data = { tipo_ticket: '', id_ticket: '', id_cruce: '', id_tramo: '', val_seed: '' };
        this.dataVehiculo = { tipo_ticket: '', id_ticket: '', id_cruce: '', id_tramo: '', val_seed: '' };
        this.resultadoSQL = { ticket: '', resultado: '' };
    }
    // scanOpenSourceQR(){
    //  this.barcodeScanner.scan().then((barcodeData) => {
    //    this.procesaDataQR(barcodeData.text);
    //   }, (err) => {
    //     console.log(err);
    //   });
    // }
    ScanQrPage.prototype.scanOpenSourceQR = function () {
        var codigoQR;
        //codigoQR = "20&66772&7470&11179433";
        codigoQR = "17&72233&7470&15242958";
        this.procesaDataQR(codigoQR);
    };
    ScanQrPage.prototype.getOverlayStyle = function () {
        var isSemi = this.semicircle;
        var transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
        return {
            'top': isSemi ? 'auto' : '50%',
            'bottom': isSemi ? '5%' : 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform,
            'font-size': this.radius / 3.5 + 'px'
        };
    };
    //Cuando se va a enetrar a la pantalla, este código se ejecuta.
    ScanQrPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.tramo = this.navParams.data.tramo;
        console.log(this.tramo.cruce.id_tramo);
        // localStorage.setItem("cruce", JSON.stringify(this.tramo.cruce));
        console.log(this.tramo);
        var id_cruce_tramo = { id_cruce: this.tramo.cruce.id_cruce, id_tramo: this.tramo.cruce.id_tramo };
        if (this.navParams.data.switch == true) {
            this.escaneo_continuo = true;
        }
        else {
            this.escaneo_continuo = false;
        }
        this.restService.postCantPasajeros(id_cruce_tramo).then(function (dataSP) {
            if (dataSP['name'] === 'HttpErrorResponse') {
                console.log("No hay conexión");
                _this.cantPasajeros = "Sin conexión";
            }
            else {
                var resultado = dataSP[0].pasajeros;
                _this.cantPasajeros = resultado + ' de ' + _this.tramo.cruce.cupo_pasajeros_maximo;
                console.log(_this.cantPasajeros);
                _this.max = _this.tramo.cruce.cupo_pasajeros_maximo;
                _this.current = resultado;
            }
        });
    };
    //Cuando se entró a la pantalla...
    ScanQrPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.escaneo_continuo == true) {
            console.log("TRUE -> Escaner en modo automatico");
            setTimeout(function () {
                _this.scanOpenSourceQR();
            }, 1500);
        }
        else {
            console.log("FALSE -> Escaner en modo manual");
            return;
        }
    };
    ScanQrPage.prototype.escaneoContinuo = function () {
        if (this.escaneo_continuo == false) {
            //this.navCtrl.setRoot(ScanQrPage, {tramo: this.tramo});
            return;
        }
    };
    //Función que crea un 'cargando...' y la llamamos cuando sea necesario
    ScanQrPage.prototype.presentLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Validando Ticket...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 650);
    };
    //función que crea un mensaje dentro de una ventana negra durante un tiempo, en la parte inferior de la pantalla del celular
    ScanQrPage.prototype.presentToast = function (tipoError) {
        var mensaje;
        if (tipoError == 1) {
            mensaje = 'ERROR DE CONEXIÓN: Verifique su conexión Wi-Fi.';
        }
        else {
            mensaje = 'PROBLEMA AL PROCESAR... Continue con embarque.';
        }
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 2500,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ScanQrPage.prototype.procesaDataQR = function (data) {
        var _this = this;
        this.presentLoading();
        this.dataQR = data;
        console.log(JSON.stringify(this.dataQR));
        var splittedQR = this.dataQR.split("&");
        //Si el TIPO_TICKET es igual a 1 o 17 quiere decir que es un ticket de persona, así mismo si es 4 o 20 un ticket de vehículo
        switch (splittedQR[0]) {
            case '1': {
                this.procesaPasajero(splittedQR);
                //Validamos el Ticket
                if (this.cantPasajeros == 'Sin conexión') {
                }
                else {
                    this.restService.postValTicket(this.data).then(function (dataSP) {
                        console.log(JSON.stringify(dataSP));
                        _this.resultadoSQL = dataSP[0];
                        if (dataSP['name'] === 'HttpErrorResponse') {
                            _this.presentToast(1);
                            console.log("ERROR");
                            return;
                        }
                        else if (_this.resultadoSQL.resultado == 8) {
                            _this.aprobarRechazarTicketPersona(splittedQR);
                        }
                        else {
                            _this.aprobarRechazarTicketPersona(splittedQR);
                        }
                    });
                }
                break;
            }
            case '4': {
                this.procesaVehiculo(splittedQR);
                //Validamos Ticket de Vehiculo
                if (this.cantPasajeros == 'Sin conexión') {
                }
                else {
                    this.restService.postValTicketVehiculo(this.dataVehiculo).then(function (dataSP) {
                        console.log(JSON.stringify(dataSP));
                        _this.resultadoSQL = dataSP[0];
                        if (dataSP['name'] === 'HttpErrorResponse') {
                            _this.presentToast(1);
                            console.log('ERROR');
                        }
                        else if (_this.tramo.cruce.id_cruce == _this.dataVehiculo.id_cruce && _this.resultadoSQL.resultado == 8) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aprobacion_aprobacion__["a" /* AprobacionPage */], { dataQR: splittedQR, tramo: _this.tramo, switch: _this.escaneo_continuo });
                        }
                        else {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__rechazo_rechazo__["a" /* RechazoPage */], { dataQR: splittedQR, tramo: _this.tramo, resultado: _this.resultadoSQL.resultado, switch: _this.escaneo_continuo });
                        }
                    });
                }
                break;
            }
            case '17': {
                this.procesaPasajero(splittedQR);
                //Validamos el Ticket
                var compararValSeed = this.validationSeed(+this.data.id_ticket, +this.data.id_cruce, +this.data.tipo_ticket);
                if (this.data.val_seed == compararValSeed.toString()) {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aprobacion_aprobacion__["a" /* AprobacionPage */], { dataQR: splittedQR, tramo: this.tramo, switch: this.escaneo_continuo });
                }
                else {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__rechazo_rechazo__["a" /* RechazoPage */], { dataQR: splittedQR, tramo: this.tramo, switch: this.escaneo_continuo });
                }
                break;
            }
            case '20': {
                this.procesaVehiculo(splittedQR);
                //Validamos el Ticket
                var compararValSeed = this.validationSeed(+this.dataVehiculo.id_ticket, +this.dataVehiculo.id_cruce, +this.dataVehiculo.tipo_ticket);
                if (this.dataVehiculo.val_seed == compararValSeed.toString()) {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aprobacion_aprobacion__["a" /* AprobacionPage */], { dataQR: splittedQR, tramo: this.tramo, switch: this.escaneo_continuo });
                }
                else {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__rechazo_rechazo__["a" /* RechazoPage */], { dataQR: splittedQR, tramo: this.tramo, switch: this.escaneo_continuo });
                }
                break;
            }
            default: {
                this.presentToast(2);
                break;
            }
        }
    };
    ScanQrPage.prototype.procesaPasajero = function (dataQRpasajero) {
        this.data = { tipo_ticket: dataQRpasajero[0], id_ticket: dataQRpasajero[1], id_cruce: dataQRpasajero[2], id_tramo: this.tramo.cruce.id_tramo, val_seed: dataQRpasajero[3] };
        console.log(JSON.stringify(this.data));
        return this.data;
    };
    ScanQrPage.prototype.procesaVehiculo = function (dataQRvehiculo) {
        this.dataVehiculo = { tipo_ticket: dataQRvehiculo[0], id_ticket: dataQRvehiculo[1], id_cruce: dataQRvehiculo[2], id_tramo: this.tramo.cruce.id_tramo, val_seed: dataQRvehiculo[3] };
        console.log(JSON.stringify(this.dataVehiculo));
        return this.dataVehiculo;
    };
    //Validamos los datos del tramo seleccionado vs la data del QR de pasajero
    ScanQrPage.prototype.aprobarRechazarTicketPersona = function (splittedQR) {
        if (this.tramo.cruce.id_cruce == this.data.id_cruce && this.resultadoSQL.resultado == 8) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aprobacion_aprobacion__["a" /* AprobacionPage */], { dataQR: splittedQR, tramo: this.tramo, switch: this.escaneo_continuo });
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__rechazo_rechazo__["a" /* RechazoPage */], { resultado: this.resultadoSQL.resultado, tramo: this.tramo, dataQR: splittedQR, switch: this.escaneo_continuo });
        }
        console.log("Validación exitosa de ticket");
    };
    ScanQrPage.prototype.validationSeed = function (id_ticket, id_cruce, tipo_ticket) {
        var valSeed;
        if (tipo_ticket == 17) {
            valSeed = ((((id_ticket - 17) * 22 - id_cruce) * (id_ticket - (tipo_ticket * 7))) / (id_cruce + 11));
            console.log("ValSeed: " + Math.trunc(valSeed));
        }
        else {
            valSeed = ((((id_ticket - 13) * 19 - id_cruce) * (id_ticket - (tipo_ticket * 17))) / (id_cruce + 23));
            console.log("ValSeed: " + Math.trunc(valSeed));
        }
        return Math.trunc(valSeed);
    };
    ScanQrPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-scan-qr',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/scan-qr/scan-qr.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Escanear Código QR</ion-title>\n    <button ion-button icon-only menuToggle end>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content no-bounce>\n\n  <ion-item>\n    <ion-label>Escaneo Continuo</ion-label>\n    <ion-toggle [(ngModel)]="escaneo_continuo" (ionChange)="escaneoContinuo(this)"></ion-toggle>\n  </ion-item>\n\n  <ion-card style="margin-top: 20%;">\n    <ion-card-content>\n      <ion-card-title style="text-align: center;margin: 0 0 3rem 0;">Escanee el código QR de la Tarjeta de Embarque</ion-card-title>\n      <button style="height:8rem; transition:none; font-size:2.4rem; border-radius: 30px;"\n              ion-button block color="Broom"\n              (click)="scanOpenSourceQR($event)">REALIZAR SCAN QR\n              <ion-icon name="barcode"></ion-icon>\n      </button>\n    </ion-card-content>\n  </ion-card>\n\n  <div class="progress-wrapper">\n    <div class="current" [ngStyle]="getOverlayStyle()">{{ current }}/{{ max }}</div>\n\n    <round-progress\n      [current]="current"\n      [max]="max"\n      [stroke]="stroke"\n      [radius]="radius"\n      [semicircle]="semicircle"\n      [rounded]="rounded"\n      [responsive]="responsive"\n      [clockwise]="clockwise"\n      [color]="gradient ? \'url(#gradient)\' : color"\n      [background]="background"\n      [duration]="duration"\n      [animation]="animation"\n      [animationDelay]="animationDelay"></round-progress>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/scan-qr/scan-qr.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__["a" /* RestServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__["a" /* RestServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]) === "function" && _f || Object])
    ], ScanQrPage);
    return ScanQrPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=scan-qr.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rest_service_rest_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StorageServiceProvider = /** @class */ (function () {
    function StorageServiceProvider(platform, restService) {
        this.platform = platform;
        this.restService = restService;
        this.ajustes = {
            existe_usuario: false,
            mostrar_login: true,
            mostrar_seleccionTramo: false
        };
        this.usuario = {
            id_usuario: '',
            username: '',
            usersecondname: ''
        };
        this.cruce = {};
        console.log('Hello StorageServiceProvider Provider');
    }
    StorageServiceProvider.prototype.cargar_storage = function () {
        if (this.platform.is("cordova")) {
            // Dispositivo
        }
        else {
            // Desktop
            if (localStorage.getItem("ajustes") && localStorage.getItem("usuario")) {
                this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
                this.usuario = JSON.parse(localStorage.getItem("usuario"));
            }
        }
    };
    StorageServiceProvider.prototype.guardar_storage = function () {
        if (this.platform.is("cordova")) {
            // Dispositivo
        }
        else {
            // Desktop
            localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
            localStorage.setItem("usuario", JSON.stringify(this.usuario));
        }
    };
    StorageServiceProvider.prototype.guardar_usuariosSQL = function () {
        localStorage.setItem("UsersSQL", JSON.stringify(this.UsersSQL));
    };
    StorageServiceProvider.prototype.cargar_usuariosSQL = function () {
        if (localStorage.getItem("UsersSQL")) {
            this.UsersSQL = JSON.parse(localStorage.getItem("UsersSQL"));
        }
    };
    StorageServiceProvider.prototype.guardar_Tramos = function () {
        localStorage.setItem("TramosSQL", JSON.stringify(this.TramosSQL));
    };
    StorageServiceProvider.prototype.cargar_Tramos = function () {
        if (localStorage.getItem("TramosSQL")) {
            this.TramosSQL = JSON.parse(localStorage.getItem("TramosSQL"));
        }
    };
    StorageServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__rest_service_rest_service__["a" /* RestServiceProvider */]])
    ], StorageServiceProvider);
    return StorageServiceProvider;
}());

//# sourceMappingURL=storage-service.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeleccionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viajes_viajes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_service_storage_service__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Importamos la Pagina a la que vamos a redireccionar

//Importamos los plugins a utilizar

var SeleccionPage = /** @class */ (function () {
    function SeleccionPage(navCtrl, navParams, loadingCtrl, storageService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.storageService = storageService;
        this.scannerActive = "barcode";
        this.usuario = this.navParams.data;
        this.storageService.usuario = this.navParams.data;
        this.storageService.ajustes.mostrar_login = false;
        console.log(this.usuario);
    }
    SeleccionPage.prototype.ionViewDidLoad = function () {
        this.storageService.cargar_storage();
        if (this.storageService.ajustes.existe_usuario == true) {
            this.usuario = this.storageService.usuario;
            this.storageService.guardar_storage();
            console.log(this.usuario);
        }
        if (this.storageService.ajustes.existe_usuario == false) {
            this.storageService.usuario = this.usuario;
            this.storageService.ajustes.existe_usuario = true;
            this.storageService.guardar_storage();
        }
    };
    SeleccionPage.prototype.abrirViajes = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__viajes_viajes__["a" /* ViajesPage */], { id_usuario: _this.usuario.id_usuario });
        }, 1000);
        setTimeout(function () {
            loading.dismiss();
        }, 1050);
    };
    SeleccionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-seleccion',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/seleccion/seleccion.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title class="logo"></ion-title>\n\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-content>\n      <ion-card-title>Sistema de Registro de Embarque de Pasajeros</ion-card-title>\n      <ion-list>\n        <ion-item>\n          <ion-icon name="person" item-start></ion-icon>\n          <ion-label style="font-size:1.45rem;">Bienvenido: <span>{{usuario.username}} {{usuario.usersecondname}}</span></ion-label>\n        </ion-item>\n        <ion-item>\n          <button style="height: 6rem; transition: none;font-size: 2.1rem;" ion-button full color="Broom"\n                  (click)="abrirViajes()">Seleccionar Viaje</button>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/seleccion/seleccion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]])
    ], SeleccionPage);
    return SeleccionPage;
}());

//# sourceMappingURL=seleccion.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViajesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resumen_resumen__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_storage_service_storage_service__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//Pagina ResumenPage

//Importamos Servicios APIRest


var ViajesPage = /** @class */ (function () {
    function ViajesPage(navCtrl, navParams, restServices, toastCtrl, loadingCtrl, storageService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restServices = restServices;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storageService = storageService;
        this.Viaje = {}; // Datos obtenidos del formulario de la página Viaje.html
        this.origenes = [{ nombre_sitio: 'Punta Arenas' }, { nombre_sitio: 'Porvenir' }, { nombre_sitio: 'Puerto Williams' }, { nombre_sitio: 'Punta Delgada' }, { nombre_sitio: 'Bahía Azul' }, { nombre_sitio: 'Río Verde' }, { nombre_sitio: 'Ponsomby' },
            { nombre_sitio: 'Puerto Natales' }, { nombre_sitio: 'Puerto Edén' }, { nombre_sitio: 'Caleta Tortel' }, { nombre_sitio: 'Puerto Yungay' }]; //objetos con ID y Nombre de Sito guardados en un Array
        this.destinos = []; //objetos con ID y Nombre de Sito guardados en un Array
        this.cruces = [];
        this.fechas = { fecha: '' }; //Objeto a Enviar al Servicio Rest para que lo consuma el metodo.
        this.aux = 0; // variable auxiliar, que nos ayuda a guardar en la posicion correcta, los tramos encontrados que correspondan a lo seleccionado
        console.log(this.navParams.data);
    }
    ViajesPage_1 = ViajesPage;
    ViajesPage.prototype.buscarCruce = function (destino) {
        this.presentLoading();
        //Se comprueba que el id del tramo sean iguales, tanto del servidor como el seleccionado
        for (var i = 0; i < this.destinos.length; i++) {
            if (destino == this.destinos[i].nombre_sitio) {
                var id_tramo = this.destinos[i].id_tramo;
                console.log(this.destinos[i].id_tramo);
            }
        }
        //Entre todos los tramos encontrados, buscamos lo que concuerden con el ID del tramos seleccionado por el operador, y guardamos solo dichos tramos en una variable.
        for (var j = 0; j < this.cruceSQL.recordset.length; j++) {
            if (this.cruceSQL.recordset[j].id_tramo == id_tramo) {
                this.cruces[this.aux] = this.cruceSQL.recordset[j];
                this.aux = this.aux + 1;
            }
        }
        if (this.aux == 0) {
            this.presentToast();
        }
    };
    ViajesPage.prototype.ionViewWillEnter = function () {
        this.storageService.cargar_Tramos();
        this.cruceSQL = this.storageService.TramosSQL;
    };
    //Ver funcion en app.component.ts para mayor información
    //Funcion que toma la fecha del día y consulta al Procedimiento almacedado, aserca de los tramos de la fecha indicada. Y guarda la informacion recibida, en la variable cruceSQL
    // infoViaje(){
    //   let fechaActual = new Date().toLocaleDateString()
    //   let fechaSplitted = fechaActual.split("/");
    //   let fechaNueva = fechaSplitted[2]+"-"+fechaSplitted[1]+"-"+fechaSplitted[0];
    //   this.fechas.fecha = fechaNueva.toString();
    //   this.restServices.postDate(this.fechas).then(data =>{
    //     this.cruceSQL = data;
    //   });
    // }
    //Funcion que envia los datos seleccionados en la vista de Seleccion de Viajes, a la pagina de Resumen
    ViajesPage.prototype.seleccionTramo = function (cruce, origen, destino, id_usuario, fecha) {
        id_usuario = this.navParams.data;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__resumen_resumen__["a" /* ResumenPage */], { cruce: cruce, origen: origen, destino: destino, id_usuario: id_usuario });
    };
    ViajesPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'No se han encontrado Tramos disponibles. Por favor, consultar al encargado.',
            duration: 5000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ViajesPage.prototype.presentLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Buscando Cruces...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 250);
    };
    ViajesPage.prototype.onSelectChange = function (origen) {
        switch (origen) {
            case "Punta Arenas": {
                this.destinos = [{ nombre_sitio: 'Porvenir', id_tramo: 1 }, { nombre_sitio: 'Puerto Williams', id_tramo: 3 }, { nombre_sitio: 'Isla Magdalena', id_tramo: 9 }, { nombre_sitio: 'Bahía Punta Arenas', id_tramo: 11 }];
                break;
            }
            case "Porvenir": {
                this.destinos = [{ nombre_sitio: 'Punta Arenas', id_tramo: 2 }];
                break;
            }
            case "Puerto Williams": {
                this.destinos = [{ nombre_sitio: 'Punta Arenas', id_tramo: 4 }];
                break;
            }
            case "Punta Delgada": {
                this.destinos = [{ nombre_sitio: 'Bahía Azul', id_tramo: 5 }];
                break;
            }
            case "Bahía Azul": {
                this.destinos = [{ nombre_sitio: 'Punta Delgada', id_tramo: 6 }];
                break;
            }
            case "Río Verde": {
                this.destinos = [{ nombre_sitio: 'Ponsomby', id_tramo: 7 }];
                break;
            }
            case "Ponsomby": {
                this.destinos = [{ nombre_sitio: 'Río Verde', id_tramo: 8 }];
                break;
            }
            case "Puerto Natales": {
                this.destinos = [{ nombre_sitio: 'Puerto Edén', id_tramo: 41 }, { nombre_sitio: 'Caleta Tortel', id_tramo: 42 }, { nombre_sitio: 'Puerto Yungay', id_tramo: 43 }];
                break;
            }
            case "Puerto Edén": {
                this.destinos = [{ nombre_sitio: 'Caleta Tortel', id_tramo: 44 }, { nombre_sitio: 'Puerto Yungay', id_tramo: 45 }, { nombre_sitio: 'Puerto Natales', id_tramo: 51 }];
                break;
            }
            case "Caleta Tortel": {
                this.destinos = [{ nombre_sitio: 'Puerto Yungay', id_tramo: 46 }, { nombre_sitio: 'Puerto Natales', id_tramo: 52 }, { nombre_sitio: 'Puerto Edén', id_tramo: 54 }];
                break;
            }
            case "Puerto Yungay": {
                this.destinos = [{ nombre_sitio: 'Puerto Natales', id_tramo: 53 }, { nombre_sitio: 'Puerto Edén', id_tramo: 55 }, { nombre_sitio: 'Caleta Tortel', id_tramo: 56 }];
                break;
            }
            default: {
                this.presentToast();
                break;
            }
        }
    };
    ViajesPage.prototype.limpiarBusqueda = function () {
        this.navCtrl.setRoot(ViajesPage_1, this.navParams.data);
    };
    ViajesPage.prototype.abrirDestino = function () {
        var _this = this;
        setTimeout(function () {
            _this.selectDestino.open();
        }, 25);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectDestino'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], ViajesPage.prototype, "selectDestino", void 0);
    ViajesPage = ViajesPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-viajes',template:/*ion-inline-start:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/viajes/viajes.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Selección de Viaje</ion-title>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding no-bounce>\n\n<ion-list>\n <h4 *ngIf="Viaje.destino == null">Seleccione el Origen del tramo.</h4>\n <ion-item *ngIf="Viaje.destino == null">\n   <ion-label style="font-size:2rem">ORIGEN</ion-label>\n   <!-- Ante la seleccion del item, se envia al controlador el parametro del ngModel para correr el codigo -->\n   <ion-select #selectOrigenes\n               [(ngModel)]="Viaje.origen" name="origen"\n               interface="action-sheet"\n               submitText="Aceptar" cancelText="Cancelar"\n               (ionChange)="onSelectChange(Viaje.origen)"\n               (ionChange)="abrirDestino()">\n     <ion-option *ngFor="let origen of origenes">{{ origen.nombre_sitio }}</ion-option>\n   </ion-select>\n </ion-item>\n <h4 *ngIf="Viaje.destino == null && Viaje.origen != null">Seleccione el Destino del tramo.</h4>\n <ion-item *ngIf="Viaje.destino == null && Viaje.origen != null">\n   <ion-label style="font-size:2rem">DESTINO</ion-label>\n   <ion-select  #selectDestino\n                [(ngModel)]="Viaje.destino" name="destino"\n                interface="action-sheet"\n                submitText="Aceptar" cancelText="Cancelar"\n                (ionChange)="buscarCruce(Viaje.destino)">\n    <ion-option *ngFor="let destino of destinos">{{ destino.nombre_sitio }}</ion-option>\n   </ion-select>\n </ion-item>\n<h1 *ngIf="Viaje.destino != null">Seleccione uno de los siguientes tramos</h1>\n <ion-card *ngFor="let cruce of cruces; let i = index" (click)="seleccionTramo(cruce, Viaje.origen, Viaje.destino)">\n   <ion-card-content *ngIf="i < 2">\n     <ion-card-title>Fecha: {{cruce.horario_cruce | date :"dd/MM/yyyy \'Cruce:\' h:mma ":"+0000"}}</ion-card-title>\n     <h2>{{Viaje.origen}} -> {{Viaje.destino}}</h2>\n     <h2>Presentación: {{cruce.horario_presentacion | date: \'h:mma \':\'+0000\'}}</h2>\n     <h3>Nave: {{cruce.nombre_nave}}</h3>\n   </ion-card-content>\n </ion-card>\n <ion-item style="position: absolute; bottom:0; margin-left: -15px;"\n           *ngIf="Viaje.destino!= null">\n   <button style="height: 6rem;transition: none;font-size: 2rem;"\n           ion-button full color="danger"\n           (click)="limpiarBusqueda()">\n    CANCELAR<ion-icon name="trash"></ion-icon>\n  </button>\n </ion-item>\n</ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/jmoraga/TABSA/ioEmbarquePasajeros/src/pages/viajes/viajes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service_rest_service__["a" /* RestServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]])
    ], ViajesPage);
    return ViajesPage;
    var ViajesPage_1;
}());

//# sourceMappingURL=viajes.js.map

/***/ })

},[217]);
//# sourceMappingURL=main.js.map