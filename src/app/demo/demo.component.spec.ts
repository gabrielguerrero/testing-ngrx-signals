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
  it('should initially render the list of products', async () => {
    await render(DemoComponent, {
      providers: [provideHttpClient()],
    });
    expect(await screen.findByText('Loading...')).toBeDefined();
    const list = await screen.findAllByRole('listitem');
    expect(list.length).toBe(122);
    expect(list[0].textContent).toEqual('Super Mario World');
  });

  it('should filter the products if typed on the filter box', async () => {
    await render(DemoComponent, {
      providers: [provideHttpClient()],
    });
    const searchBox = await screen.getByRole('textbox', {
      name: /search/i,
    });
    await userEvent.type(searchBox, 'Zelda');
    expect(screen.findByText('Loading...')).toBeDefined();
    const list = await screen.findAllByRole('listitem');
    expect(list.length).toBeGreaterThan(0);
    expect(
      list.map((v) => v.textContent).every((v) => v?.match(/Zelda/i)),
    ).toBeTruthy();
  });
});
