import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs/operators';

import { Product, ProductDetail } from '../models';
import { mockProducts } from './mock-backend/product.handler';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(options?: {
    search?: string | undefined;
    sortColumn?: keyof Product | string | undefined;
    sortAscending?: boolean | undefined;
    skip?: number | undefined;
    take?: number | undefined;
  }) {
    console.log('getProducts', options);
    return this.httpClient
      .get<{
        resultList: Product[];
        total: number;
      }>('http://localhost:8080/api/products')
      .pipe(tap(console.log), delay(500));
  }

  getProductDetail(id: string) {
    return this.httpClient
      .get<ProductDetail>('/api/products/' + id)
      .pipe(delay(500));
  }
}
