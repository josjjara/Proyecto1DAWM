import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

interface DataVideoJuegos {
  desarrollador:string;
  description:string;
  fechaLanzamiento:string;
  genre:string;
  idJuego:number;
  leadDesignernombre:{firstName:string; lastName:string};
  nombre:string;
  sales:number
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css']
})
export class HomeComponent{

  displayedColumns: string[] = ['nombre', 'genre', 'desarrollador'];
  dataSource :TableVirtualScrollDataSource<DataVideoJuegos> = new TableVirtualScrollDataSource<DataVideoJuegos>;
  selection = new SelectionModel<DataVideoJuegos>(true, []);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  ngOnInit() {

    fetch('https://dawmproject-default-rtdb.firebaseio.com/colection.json')
    .then( response => response.json())
    .then(data =>{

      this.dataSource = new TableVirtualScrollDataSource<DataVideoJuegos>(data);;

    });


    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
