import { inject } from '@angular/core';
import {
  withCalls,
  withCallStatus,
  withEntitiesLoadingCall,
  withEntitiesRemoteFilter,
  withEntitiesRemotePagination,
  withEntitiesSingleSelection,
} from '@ngrx-traits/signals';
import { signalStore, type } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { Product } from '../models';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';

const entity = type<Product>();
const collection = 'products';
export const ProductsRemoteStore = signalStore(
  withEntities({ entity, collection }),
  withCallStatus({ collection, initialValue: 'loading' }),
  withEntitiesRemotePagination({
    entity,
    collection,
    pageSize: 5,
    pagesToCache: 4,
  }),
  withEntitiesRemoteFilter({
    entity,
    collection,
    defaultFilter: {
      search: '',
    },
  }),
  withEntitiesSingleSelection({ entity, collection }),
  withCalls(() => ({
    loadProductDetail: ({ id }: { id: string }) =>
      inject(ProductService).getProductDetail(id),
  })),
  // this replace the withHooks
  withEntitiesLoadingCall({
    collection,
    fetchEntities: ({ productsFilter, productsPagedRequest }) => {
      return inject(ProductService)
        .getProducts({
          search: productsFilter().search,
          take: productsPagedRequest().size,
          skip: productsPagedRequest().startIndex,
        })
        .pipe(map((res) => ({ entities: res.resultList, total: res.total })));
    },
  }),
);
