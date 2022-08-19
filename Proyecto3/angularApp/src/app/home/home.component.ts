import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css']
})
export class HomeComponent{
  Items:string[] = ["343","Bethesda","Infinity Ward","Ubisoft","Bungie","2kGames","Telltale","Skybound"];
  constructor() { }

}
