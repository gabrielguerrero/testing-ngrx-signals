import { effect, inject } from '@angular/core';
import {
  withCalls,
  withCallStatus,
  withEntitiesLocalFilter,
  withEntitiesLocalPagination,
  withEntitiesSingleSelection,
} from '@ngrx-traits/signals';
import { patchState, signalStore, type, withHooks } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';

import { Product } from '../models';
import { ProductService } from '../services/product.service';
import { lastValueFrom } from 'rxjs';

const entity = type<Product>();
export const ProductsLocalStore = signalStore(
  withEntities({ entity }),
  withCallStatus({ initialValue: 'loading' }),
  withEntitiesLocalPagination({ entity, pageSize: 5 }),
  withEntitiesLocalFilter({
    entity,
    defaultFilter: {
      search: '',
    },
    filterFn: (entity, filter) =>
      !filter?.search ||
      entity?.name.toLowerCase().includes(filter?.search.toLowerCase()),
  }),
  withEntitiesSingleSelection({ entity }),
  withCalls(() => ({
    loadProductDetail: ({ id }: { id: string }) =>
      inject(ProductService).getProductDetail(id),
  })),
  withHooks(({ setLoaded, setError, ...store }) => ({
    onInit: async () => {
      const productService = inject(ProductService);
      try {
        const res = await lastValueFrom(productService.getProducts());
        console.log('res', res);
        patchState(store, setAllEntities(res.resultList));
        setLoaded();
      } catch (e) {
        setError(e);
      }
    },
  })),
);
