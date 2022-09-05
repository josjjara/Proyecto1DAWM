import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const url = "localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  requestLogin(username:String,password:String){
    this.http.post(url+"/login",{username: username, password:password},{ withCredentials:true})
  }

  requestLogout(){
    this.http.get(url + '/login/logout')
  }


}
