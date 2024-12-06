import { computed, inject } from '@angular/core';
import { withCalls } from '@ngrx-traits/signals';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models';
import { ProductService } from '../services/product.service';

export function withLoadProductDetail() {
  return signalStoreFeature(
    withState<{
      productDetail: Product | undefined;
      productDetailStatus: 'init' | 'loading' | 'loaded' | { error: unknown };
    }>({
      productDetail: undefined,
      productDetailStatus: 'init',
    }),
    withComputed(({ productDetailStatus }) => ({
      isProductDetailLoading: computed(
        () => productDetailStatus() === 'loading',
      ),
      isProductDetailLoaded: computed(() => productDetailStatus() === 'loaded'),
      productDetailError: computed(() => {
        const v = productDetailStatus();
        return typeof v === 'object' ? v.error : null;
      }),
    })),
    withMethods((store) => ({
      setProductDetailLoading: () => {
        patchState(store, { productDetailStatus: 'loading' });
      },
      setProductDetailLoaded: () => {
        patchState(store, { productDetailStatus: 'loaded' });
      },
      setProductDetailError: (error: any) => {
        patchState(store, { productDetailStatus: { error } });
      },
    })),
    withMethods(
      ({
        setProductDetailLoading,
        setProductDetailLoaded,
        setProductDetailError,
        ...store
      }) => {
        const productService = inject(ProductService);

        return {
          loadProductDetail: rxMethod<{ id: string }>(
            pipe(
              tap(() => setProductDetailLoading()),
              switchMap((param) =>
                productService.getProductDetail(param.id).pipe(
                  tap((res) => {
                    patchState(store, {
                      productDetail: res,
                    });
                    setProductDetailLoaded();
                  }),
                  catchError((error) => {
                    setProductDetailError(error);
                    return EMPTY;
                  }),
                ),
              ),
            ),
          ),
        };
      },
    ),
    // withCalls(() => ({
    //   loadProductDetail: ({ id }: { id: string }) => {
    //     return inject(ProductService).getProductDetail(id);
    //   },
    // })),
  );
}
