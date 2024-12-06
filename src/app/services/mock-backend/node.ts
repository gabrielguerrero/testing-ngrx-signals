import { setupServer } from 'msw/node';

import { branchesHandlers } from './branches.handler';
import { productHandlers } from './product.handler';

export const server = setupServer(...productHandlers, ...branchesHandlers);

// server.events.on('request:start', ({ request }) => {
//   console.log('Outgoing:', request.method, request.url);
// });
