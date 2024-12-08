import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models';
import { ProductService } from '../services/product.service';
import { typedCallConfig, withCalls } from '@ngrx-traits/signals';

export function withLoadProducts() {
  return signalStoreFeature(
    withCalls(() => ({
      loadProducts: typedCallConfig({
        mapPipe: 'switchMap',
        call: ({ search }: { search?: string }) =>
          inject(ProductService)
            .getProducts({ search })
            .pipe(map((res) => res.resultList)),
      }),
    })),
  );
}
