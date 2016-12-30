import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { State } from '../types/state.type';
import { Dimentions } from '../types/dimentions.type';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  @Input() dimentions: Dimentions;
  public x: Object;
  public y: Object;
  public robot: State = {
    x: 3,
    y: 4,
    direction: 'W'
  };

  constructor() { }

  ngOnChanges(changes: any) {
    if (this.dimentions !== undefined) {
      this.x = new Array(this.dimentions.x.valueOf() + 1);
      this.y = new Array(this.dimentions.y.valueOf() + 1);
    }
  }

  ngOnInit() { }

}
