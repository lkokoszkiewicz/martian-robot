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
  public dim: Dimentions;
  public robots: Robot[];
  private input: String[];
  private lostRobots: Robot[] = [];

  onSubmit(values) {
    this.input = values.input.split('\n');

    this.lostRobots = [];

    this.setRobots();
    this.setWorld();

    for (let i = 0; i < this.robots.length; i++) {
      this.runRobotCommands(this.robots[i]);
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
          commands: [],
          lost: false
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

  isOutOfBoundries(coords) {
    let x = false, y = false;
    if (coords.hasOwnProperty('x')) {
      x = (coords.x < 0) || (coords.x > this.dim.x);
    }

    if (coords.hasOwnProperty('y')) {
      y = (coords.y < 0) || (coords.y > this.dim.y);
    }

    return x || y;
  }

  moveRobot(robot, move) {
    let status = true;
    if (!this.lostRobots.find((lostRobot) => {
      return robot.x === lostRobot.x
        && robot.y === lostRobot.y
        && robot.direction === lostRobot.direction;
    })) {
      if (!this.isOutOfBoundries(move)) {
        Object.assign(robot, move);
      } else {
        status = false;
      }
    }

    return status;
  }

  runRobotCommands(robot) {
    let directionMap = {
      N: {R: 'E', L: 'W'},
      E: {R: 'S', L: 'N'},
      S: {R: 'W', L: 'E'},
      W: {R: 'N', L: 'S'}
    };
    let evaluateMap = {
      S: () => { return { y: robot.y - 1 }; },
      W: () => { return { x: robot.x - 1 }; },
      N: () => { return { y: robot.y + 1 }; },
      E: () => { return { x: robot.x + 1 }; }
    };

    for (let i = 0; i < robot.commands.length; i++) {
      if (robot.commands[i] === 'F') {
        let move = evaluateMap[robot.direction]();
        if (!this.moveRobot(robot, move)) {
          robot.lost = true;
          this.lostRobots.push(robot);
          break;
        }
      } else {
        robot.direction = directionMap[robot.direction][robot.commands[i]];
      }
    }

    console.log(robot);
  }
}
