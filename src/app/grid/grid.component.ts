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
  private x: Object;
  private y: Object;
  private robot: State = {
    x: 3,
    y: 4,
    direction: 'W'
  };

  constructor() { }

  ngOnChanges(changes: any) {
    if (this.dimentions !== undefined) {
      this.x = new Array(this.dimentions.y);
      this.y = new Array(this.dimentions.x);
    }
  }

  ngOnInit() { }

}
