import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListDetail } from './product-list-paginated-page/product-list-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListDetail],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ngrx-traits-signals-playground';
}
