import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private http: HttpClient) { }

  getDesarrolladores(){
    return this.http.get(url+"/api/desarrolladores")
  }

  getVideojuegos(){
    return this.http.get(url+"/api/videojuegos")
  }

  getApi(){
    return this.http.get(url+"/index/json")
  }

}
