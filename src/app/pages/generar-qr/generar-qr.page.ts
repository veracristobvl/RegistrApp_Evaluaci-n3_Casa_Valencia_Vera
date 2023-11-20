import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente, ServicedatosService } from 'src/app/services/servicesdatos.service';
@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  qr = false
  sala = '';
  asignatura = ''
  docente: Docente = <Docente>{};
  isLoggedIn:boolean;

  public horaActual: Date;
  
  
  codigoQR = '';
  
  
  constructor(
    private storageService:ServicedatosService,
    private datePipe: DatePipe,
    private router: Router,
  ){
    
  }
  
  obtenerHoraActual(){
    this.horaActual = new Date();
  }
  ngOnInit() {
    this.storageService.getUser().then(user =>{
    this.docente = user;
    this.horaActual = new Date();
    console.log(this.horaActual)
    })

    this.storageService.isLoggedIn().then(isLoggedIn => {
      
      this.isLoggedIn = isLoggedIn;
      if(!isLoggedIn){
        this.router.navigate(['/login']);
      }
    })
  }

  generarQR(){
    if(this.sala != '' && this.asignatura != ''){
      this.qr = true
      this.codigoQR = JSON.stringify({
        idDocente:this.docente.id,
        sala:this.sala,
        fecha: this.horaActual
      })
    }else{
      alert('Se deben rellenar los datos para generar el Código!')
    }
  }
  borrarQR(){
    this.qr = false
  }
}
