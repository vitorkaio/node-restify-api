"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./../../server/common/Router");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
// import { ModelRouter } from './../routes/model.router';
class RestaurantRouter extends Router_1.Router {
    applyRouters(router) {
        router.get('/restaurants', restaurant_controller_1.default.getRestaurantsPagination);
        router.get('/restaurants/:id', restaurant_controller_1.default.getRestaurant);
        router.get('/restaurants/name/:name', restaurant_controller_1.default.getRestaurantByName);
        router.post('/restaurants', restaurant_controller_1.default.postRestaurant);
        router.put('/restaurants/:id', restaurant_controller_1.default.putRestaurant);
        router.patch('/restaurants/:id', restaurant_controller_1.default.patchRestaurant);
        router.del('/restaurants/:id', restaurant_controller_1.default.deleteRestaurant);
        router.get('/restaurants/:id/menu', restaurant_controller_1.default.getMenu);
        router.put('/restaurants/:id/menu', restaurant_controller_1.default.putReplaceMenu);
    }
}
const restaurantRouter = new RestaurantRouter();
exports.default = restaurantRouter;
