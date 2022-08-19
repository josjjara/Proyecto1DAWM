import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor() { }
  Items:string[] = ["343","Bethesda","Infinity Ward","Ubisoft","Bungie","2kGames","Telltale","Skybound"];
  ngOnInit(): void {
  }

}
