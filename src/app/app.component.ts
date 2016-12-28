import { Component } from '@angular/core';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Martian Robots';
  dim = [5, 5];

  onSubmit($event) {
    console.log($event);
  }
}
