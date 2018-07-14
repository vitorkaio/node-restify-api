import * as restify from 'restify';
import { Router } from './../../server/common/Router';
import UsersController from '../controllers/users.controller';
import { ModelRouter } from './../routes/model.router';

class UsersRouter extends Router {
  public applyRouters(router: restify.Server) {
    router.get('/users', UsersController.getUsers);
    router.get('/users/:id', UsersController.getUser);
    router.post('/users', UsersController.postUser);
    router.put('/users/:id', UsersController.putUser);
    router.patch('/users/:id', UsersController.patchUser);
    router.del('/users/:id', UsersController.deleteUser);
  }
}

const userRouter = new UsersRouter();
export default userRouter;