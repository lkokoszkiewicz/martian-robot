import { Component } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { Dimentions } from './types/dimentions.type';
import { Robot } from './types/robot.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title: String = 'Martian Robots';
  private dim: Dimentions;
  private robots: Robot[];
  private input: String[];

  onSubmit(values) {
    this.input = values.input.split('\n');

    this.setWorld();
    this.setRobots();

    for (let i = 0; i < this.robots.length; i++) {
      this.createDirectionSequance(this.robots[i]);
    }
  }

  setWorld() {
    let dim = this.input[0].split(' ').map((item) => {
      return parseInt(item, 10);
    });

    if (dim.length === 2) {
      this.dim = {
        x: dim[0],
        y: dim[1]
      };
    }
  }

  setRobots() {
    let robots: Robot[] = [];
    let robotNumber: any = -1;
    let searchState: String = 'load-position';

    for (let i = 1; i < this.input.length; i++) {
      if (searchState === 'load-position') {
        let position = this.input[i].split(' ');

        robots[++robotNumber] = {
          x: parseInt(position[0], 10),
          y: parseInt(position[1], 10),
          direction: position[2],
          commands: []
        };

        searchState = 'load-commands';
      } else if (searchState === 'load-commands') {
        robots[robotNumber].commands = this.input[i].split('');
        searchState = 'separator';
      } else if (searchState === 'separator') {
        searchState = 'load-position';
      }
    }

    this.robots = robots;
  }

  createDirectionSequance(robot) {
    let directionMap = {
      N: {R: 'E', L: 'W'},
      E: {R: 'S', L: 'N'},
      S: {R: 'W', L: 'E'},
      W: {R: 'N', L: 'S'}
    };
    let evaluateMap = {
      S: () => { robot.y -= 1; },
      W: () => { robot.x -= 1; },
      N: () => { robot.y += 1; },
      E: () => { robot.x += 1; }
    };

    for (let i = 0; i < robot.commands.length; i++) {
      if (robot.commands[i] !== 'F') {
        robot.direction = directionMap[robot.direction][robot.commands[i]];
      } else {
        evaluateMap[robot.direction]();
      }
    }

    console.log(robot);
  }
}
