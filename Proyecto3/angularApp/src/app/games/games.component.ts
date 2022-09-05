import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../servicio/recurso.service';


interface Videojuegos{
  idJuego: number;
  idDesarrollador:number;
  nombre:string;
  genre:string;
  fechaLanzamiento:string;
  sales:number;

}


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  items:Videojuegos[] = [];

  constructor(private recursoService : RecursoService) {

    recursoService.getVideojuegos().subscribe(respuesta => {
      this.items = respuesta as Array<Videojuegos>
      console.log(this.items);
    })

  }


  ngOnInit(): void {
  }


}


