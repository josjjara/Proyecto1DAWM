import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../servicio/recurso.service';

interface Desarrollador {
  idDesarrollador:number;
  nombre: string;
  especialidad: string;
  anio: number;
  cantEmpleados: number;
}


@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  items:Desarrollador[] = [];

  constructor(private recursoService : RecursoService) {

    recursoService.getDesarrolladores().subscribe(respuesta => {
      this.items = respuesta as Array<Desarrollador>
    })

  }

  ngOnInit(): void {
  }



}
