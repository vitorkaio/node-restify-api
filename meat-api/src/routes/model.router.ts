import { Router } from './../../server/common/Router';
import * as mongoose from 'mongoose';
import * as restify from 'restify';

// Classe abstrata para generalizar os models.
export abstract class ModelRouter<D extends mongoose.Document> extends Router {
  constructor(protected model: mongoose.Model<D>) {
    super();
  }

  findAll = (req: restify.Request, res: restify.Response, next: restify.Next) => {
    this.model.find({}).then(values => {
      res.json(values);
      return next();
    })
    .catch(next);
  }


}