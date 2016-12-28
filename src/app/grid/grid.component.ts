import { Component, OnInit } from '@angular/core';
import { State } from '../types/state.type';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {
  public dimensions: Number[] = [10, 10];
  public x: Object;
  public y: Object;
  public robot: State = {
    x: 3,
    y: 5,
    direction: 'W'
  };

  constructor() { }

  ngOnInit() {
    this.x = new Array(this.dimensions[0]);
    this.y = new Array(this.dimensions[1]);

    console.log(this.x);
  }

}
