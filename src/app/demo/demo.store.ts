import { effect } from '@angular/core';
import { patchState, signalStore, withHooks } from '@ngrx/signals';
import { withLoadProducts } from './with-load-products';

export const ProductStore = signalStore(
  withLoadProducts(), // withStateLogger({ name: 'asdasd' }),
  withHooks((store) => ({
    onInit: () => {
      store.loadProducts({});
      effect(
        () => {
          if (store.isProductsLoaded()) patchState(store, { loaded: true });
        },
        { allowSignalWrites: true },
      );
    },
  })),
);
