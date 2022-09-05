import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private http: HttpClient, private router : Router) { }

  ngOnInit(): void {



  }

  onClickSubmmit(){

    this.router.navigate(['home'])

  }

}
