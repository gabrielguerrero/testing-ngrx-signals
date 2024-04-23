import { setupWorker } from 'msw';

import { productHandlers } from './product.handler';

const worker = setupWorker(...productHandlers);
worker.start({
  onUnhandledRequest: 'warn',
});
console.log('msw started');
export { worker };
