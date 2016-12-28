import { Component, OnInit, Input } from '@angular/core';
import { State } from '../types/state.type';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() dimentions: Number[] = [10, 10];
  public x: Object;
  public y: Object;
  public robot: State = {
    x: 3,
    y: 4,
    direction: 'W'
  };

  constructor() { }

  ngOnInit() {
    this.x = new Array(this.dimentions[0]);
    this.y = new Array(this.dimentions[1]);

    console.log(this.x);
  }

}
