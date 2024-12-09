import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../models';
import { ProductService } from '../services/product.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { withLoadProducts } from './with-load-products';

export const ProductStore = signalStore(
  withLoadProducts(),
  withHooks((store) => ({
    onInit: () => {
      store.loadProducts({});
      effect(
        () => {
          if (store.isProductsLoaded())
            patchState(store, { message: 'All Loaded' });
        },
        { allowSignalWrites: true },
      );
    },
  })),
);
