import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  showMenu: boolean;
  app = initializeApp(environment.firebaseConfig)
  db = getFirestore(this.app)
  constructor() {
    this.showMenu = true
  }
  
  ngOnInit() {
    
    
  }
  // Referencia a la colección "alumnos"
  alumnosCollection = collection(this.db, 'docentes');
  // Funcion para Obtener Alumnos
  obtenerAlumnos = async () => {
      try {
        const querySnapshot = await getDocs(this.alumnosCollection);
    
        querySnapshot.forEach((doc) => {
          // Accede a los datos de cada documento
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
  // Función para agregar un nuevo docente
  agregarAlumno = async (nombre, edad, curso) => {
    try {
      // Agrega un nuevo documento a la colección "alumnos"
      const nuevoAlumno = await addDoc(this.alumnosCollection, {
        nombre: nombre,
        edad: edad,
        curso: curso,
      });

      console.log('Alumno agregado con ID:', nuevoAlumno.id);
    } catch (error) {
      console.error('Error al agregar alumno:', error);
    }
  };
}
