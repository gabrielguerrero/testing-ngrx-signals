import { setupWorker } from 'msw/browser';

import { branchesHandlers } from './branches.handler';
import { productHandlers } from './product.handler';

export const worker = setupWorker(...productHandlers, ...branchesHandlers);
