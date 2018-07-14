"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./src/routes/users.router");
const info_router_1 = require("./src/routes/info.router");
const restaurant_router_1 = require("./src/routes/restaurant.router");
const reviews_router_1 = require("./src/routes/reviews.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.default, info_router_1.default, restaurant_router_1.default, reviews_router_1.default]).then(server => {
    console.log('Servidor run: ', server.application.address());
}).catch(error => {
    console.log('Erro ao iniciar servidor');
    console.error(error);
    process.exit(1);
});
