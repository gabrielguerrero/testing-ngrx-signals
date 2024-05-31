import { inject } from '@angular/core';
import {
  withCallStatus,
  withEntitiesLoadingCall,
  withEntitiesRemoteScrollPagination,
} from '@ngrx-traits/signals';
import { signalStore, type } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { Branch } from '../models';
import { map } from 'rxjs/operators';
import { BranchService } from '../services/branch.service';

const entity = type<Branch>();
export const ProductBranchRemoteInfiniteStore = signalStore(
  withEntities({ entity }),
  withCallStatus({ initialValue: 'loading' }),

  withEntitiesRemoteScrollPagination({ entity, pageSize: 15 }),
  // 👆 adds signal entitiesCurrentPage()
  //    and methods loadMoreEntities(), loadEntitiesNextPage(),loadEntitiesPreviousPage()"

  withEntitiesLoadingCall({
    fetchEntities: ({ entitiesPagedRequest }) => {
      return inject(BranchService)
        .getBranches({
          take: entitiesPagedRequest().size,
          skip: entitiesPagedRequest().startIndex,
        })
        .pipe(
          map((res) => ({ entities: res.resultList, hasMore: res.hasMore })),
          //  Alternatively you can return entities with a total
          // .pipe(map((res) => ({ entities: res.resultList, total: res.total })));
          // or just entities
          // .pipe(map((res) => ({ entities: res.resultList  })));
          // in this last case, it will assume there is no more if the size of the list
          // is less than the requested size.
        );
    },
  }),
);
