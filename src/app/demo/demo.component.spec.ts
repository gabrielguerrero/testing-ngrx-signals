import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

import { DemoComponent } from './demo.component';
import { TestBed } from '@angular/core/testing';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { mockProducts } from '../services/mock-backend/product.handler';
import { ProductStore } from './demo.store';
import { signal } from '@angular/core';

describe('DemoComponentTest', () => {
  it('should initially render the list of products', () => {});

  it('should filter the products if typed on the filter box', () => {});
});
