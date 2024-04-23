import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductDetail } from '../../models';

@Component({
  selector: 'product-detail',

  template: `
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ product().name }}</mat-card-title>
            <mat-card-subtitle
              >Price: £{{ product().price | currency }} Released:
              {{ product().releaseDate }}</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <p>{{ product().description }}</p>
          </mat-card-content>
        </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, CurrencyPipe],
})
export class ProductDetailComponent {
  product = input.required<ProductDetail>();
}
