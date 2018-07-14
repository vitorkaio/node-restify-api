import * as restify from 'restify';
import { Users } from '../models/users.model';

export default class UsersController {
  public static getUsers(req: restify.Request, res: restify.Response, next: restify.Next) {
    Users.find({}).then(users => {
      res.json({
        status: 'success',
        message: users
      });
      return next();
    })
    .catch(next);
  }

  public static getUser(req: restify.Request, res: restify.Response, next: restify.Next) {
    Users.findById(req.params.id).then(user => {
      if(user) {
        res.json(user);
        return next();
      }
      res.status(404)
      res.json({msg: 'id não encontrado'});
      return next();
    })
    .catch(next);
  }

  public static postUser(req: restify.Request, res: restify.Response, next: restify.Next) {
    // Cria um novo documento para ser salvo.
    let user = new Users(req.body); // req.body já retorna todos os campos em comum com o documento.
    
    // user.name = 'Diana';
    // user.email = 'email';
    
    // Salva o documento.
    user.save().then(user => {
      user.password = undefined; //Para não retornar o password
      res.json(user);
      return next();
    })
    .catch(next);
  }

  // O PUT é utilizando quando se quer alterar todo o documento.
  public static putUser(req: restify.Request, res: restify.Response, next: restify.Next) {
    // Com essa opção, o mongoose fará o update completo, ou seja, o conteùdo do body será o novo documento.
    // Se esquecer do campo password por exemplo, o novo documento no mongo não o terá.
    const ops = {overwrite: true, runValidators: true};
    Users.update({_id: req.params.id}, req.body, ops).exec().then(result => {
      if(result.n)
        return Users.findById(req.params.id).then(user => {
          res.json(user);
          return next();
        }).catch(erro => {
          res.status(404);
          res.json({'erro': erro})
        });
      else {
        res.status(404);
        res.json({'erro': 'ERROR'});
        return next();
      }
    })
    .catch(next);
  }

  // O PATCH altera apenas partes do documento. Se a propriedade não existir: adicione. Se ela existir: altere. 
  // Pra remover a propriedade: set null.
  public static patchUser(req: restify.Request, res: restify.Response, next: restify.Next) {
    const ops = {runValidators: true, new: true} // Indica para o findByIdAndUpdate retorna o novo documento.
    Users.findByIdAndUpdate(req.params.id, req.body, ops).then(user => {
      if(user) {
        res.json(user);
        return next();
      }
      res.status(404);
      res.json({'erro': 'ERROR'});
      return next();
    }).catch(next);
  }

  public static deleteUser(req: restify.Request, res: restify.Response, next: restify.Next) {
    Users.findByIdAndRemove(req.params.id).then(user => {
      if(user)
        res.json(user);
      else {
        res.status(404);
        res.json({"msg": false});
      }

      return next();

    })
    .catch(next);
   
  }

}