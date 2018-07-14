import { Server } from './server/server';

import userRouter from './src/routes/users.router';
import infoRouter from './src/routes/info.router';
import restaurantRouter from './src/routes/restaurant.router';
import reviewsRouter from './src/routes/reviews.router';

const server = new Server();
server.bootstrap([userRouter, infoRouter, restaurantRouter, reviewsRouter]).then(server => {
  console.log('Servidor run: ', server.application.address());
}).catch(error => {
  console.log('Erro ao iniciar servidor');
  console.error(error);
  process.exit(1);
});