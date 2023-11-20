import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { Docente, ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  username:String= 'sjkds'; 
  user:any={}
  newDocente: Docente = <Docente>{};
  constructor(private storageService:ServicedatosService) {
    
   }

  ngOnInit() {
    this.username = 'xd';
    this.storageService.getUser().then(user =>{
      this.username = user.nombre
      this.newDocente = user;
    })
  }

  onSubmit() {
  }
  
  modificarDatos(){
    this.storageService.updateDatos(this.newDocente).then(resultado => {
      this.storageService.onLoginSuccess(this.newDocente)
      alert('Actualización exitosa');
    })
    .catch(error => {
      console.error('Error al actualizar datos', error);
    });

    
    
  }
}
