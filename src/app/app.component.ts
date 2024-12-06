import { Component } from '@angular/core';
import { DemoComponent } from './demo/demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemoComponent],
  template: '<demo/>',
})
export class AppComponent {
  title = 'ngrx-traits-signals-playground';
}
