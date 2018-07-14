import * as restify from 'restify';
import { Router } from './../../server/common/Router';
import RestaurantsController from '../controllers/restaurant.controller';
// import { ModelRouter } from './../routes/model.router';

class RestaurantRouter extends Router {

  public applyRouters(router: restify.Server) {
    router.get('/restaurants', RestaurantsController.getRestaurantsPagination);
    router.get('/restaurants/:id', RestaurantsController.getRestaurant);
    router.get('/restaurants/name/:name', RestaurantsController.getRestaurantByName);
    router.post('/restaurants', RestaurantsController.postRestaurant);
    router.put('/restaurants/:id', RestaurantsController.putRestaurant);
    router.patch('/restaurants/:id', RestaurantsController.patchRestaurant);
    router.del('/restaurants/:id', RestaurantsController.deleteRestaurant);

    router.get('/restaurants/:id/menu', RestaurantsController.getMenu);
    router.put('/restaurants/:id/menu', RestaurantsController.putReplaceMenu);
  }
}

const restaurantRouter = new RestaurantRouter();
export default restaurantRouter;