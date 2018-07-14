import * as restify from 'restify';
import { Router } from './../../server/common/Router';
import ReviewsController from '../controllers/reviews.controller';
// import { ModelRouter } from './../routes/model.router';

class ReviewsRouter extends Router {
  public applyRouters(router: restify.Server) {
    router.get('/reviews', ReviewsController.getReviews);
    // ReviewsController.printTime é um midd que é chamado antes de getReview
    router.get('/reviews/:id', [ReviewsController.printTime, ReviewsController.getReview]);
    router.post('/reviews', ReviewsController.postReview);
    router.put('/reviews/:id', ReviewsController.putReview);
    router.patch('/reviews/:id', ReviewsController.patchReview);
    router.del('/reviews/:id', ReviewsController.deleteReview);
  }
}

const reviewsRouter = new ReviewsRouter();
export default reviewsRouter;