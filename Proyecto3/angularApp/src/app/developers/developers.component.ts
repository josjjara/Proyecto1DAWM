import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  constructor() { }
  Items:string[] = ["343","Bethesda","Infinity Ward","Ubisoft","Bungie","2kGames","Telltale","Skybound"];
  ngOnInit(): void {
  }

}
