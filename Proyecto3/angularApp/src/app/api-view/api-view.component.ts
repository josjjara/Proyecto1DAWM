import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../servicio/recurso.service';

interface ApiUrl{
  url:string;
  uso:string;
}

@Component({
  selector: 'app-api-view',
  templateUrl: './api-view.component.html',
  styleUrls: ['./api-view.component.css']
})
export class ApiViewComponent implements OnInit {

  apiEndpoints:Array<ApiUrl> = []

  constructor(private recursoService: RecursoService) {
    recursoService.getApi().subscribe(respuesta => {
      this.apiEndpoints = respuesta as Array<ApiUrl>
    })
  }

  ngOnInit(): void {


  }

}
