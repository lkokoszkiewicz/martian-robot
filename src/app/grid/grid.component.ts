import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Robot } from '../types/robot.type';
import { Dimentions } from '../types/dimentions.type';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  @Input() dimentions: Dimentions;
  @Input() robots: Robot[] = [];
  public x: Object;
  public y: Object;
  public occupiedCells: Object;

  constructor() { }

  buildOccupiedCells() {
    this.occupiedCells = {};
    this.robots.forEach(robot => {
      this.occupiedCells[robot.x + 'x' + Math.abs(robot.y.valueOf() - this.dimentions.y.valueOf())] = robot;
    });
  }

  ngOnChanges(changes: any) {
    if (this.robots !== undefined) {
      this.buildOccupiedCells();
    }

    if (this.dimentions !== undefined) {
      this.x = new Array(this.dimentions.x.valueOf() + 1);
      this.y = new Array(this.dimentions.y.valueOf() + 1);
    }
  }

  ngOnInit() { }

}
