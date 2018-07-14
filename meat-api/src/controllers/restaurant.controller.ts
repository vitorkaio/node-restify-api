import * as restify from 'restify';
import { Restaurants } from '../models/restaurants.model';

const pageSize: number = 5; // Define a quantidade de documentos retornados pelo mongoose.

export default class RestaurantsController {

  // Retornas todos os restaurantes.
  public static getRestaurants(req: restify.Request, res: restify.Response, next: restify.Next) {
    Restaurants.find({}).then(rest => {
      res.json({
        status: 'success',
        message: rest
      });
      return next();
    })
    .catch(next);
  }

  // Retornas todos os restaurantes.
  public static getRestaurantsPagination(req: restify.Request, res: restify.Response, next: restify.Next) {
    // pegando a página.
    let page: number = parseInt(req.query._page || 1); // Pega o queryParams se não tiver será 1.
    page = page > 0 ? page : 1;

    // calculando a quantidade de páginas.
    Restaurants.count({}).exec().then(count => {
      const qtdPages: number = Math.ceil(count / pageSize);
      // se a página for maior que a quantidade de páginas disponíveis, então retorna a última.
      page = page > qtdPages ? qtdPages : page;
      
      // calculando o skip.
      const skip = (page - 1) * pageSize;

      Restaurants.find({})
      .skip(skip)
      .limit(pageSize)
      .then(rest => {
        res.json({
          status: 'success',
          message: {
            page: page,
            qtdpages: qtdPages,
            restaurants: rest
          }
        });
        return next();
      })
      .catch(next);
    })
    .catch(next);
  }

  // Retorna um restaurante pelo id.
  public static getRestaurant(req: restify.Request, res: restify.Response, next: restify.Next) {
    Restaurants.findById(req.params.id).then(rest => {
      if(rest) {
        res.json({
          status: 'success',
          message: rest
        });
        return next();
      }
      res.status(404)
      res.json({msg: 'id não encontrado'});
      return next();
    })
    .catch(next);
  }

   // Retorna um restaurante pelo nome.
   public static getRestaurantByName(req: restify.Request, res: restify.Response, next: restify.Next) {
    Restaurants.findByName(req.params.name).then(rest => {
      if(rest) {
        res.json({
          status: 'success',
          message: rest
        });
        return next();
      }
      res.status(404)
      res.json({msg: 'id não encontrado'});
      return next();
    })
    .catch(next);
  }

  // Insere um restaurante.
  public static postRestaurant(req: restify.Request, res: restify.Response, next: restify.Next) {
    // Cria um novo documento para ser salvo.
    let restaurant = new Restaurants(req.body); // req.body já retorna todos os campos em comum com o documento.
    
    // restaurant.name = 'Diana';
    // restaurant.email = 'email';
    
    // Salva o documento.
    restaurant.save().then(rest => {
      // restaurant.password = undefined; Para não retornar o password
      res.json({
        status: 'success',
        message: rest
      });
      return next();
    })
    .catch(next);
  }

  // O PUT é utilizando quando se quer alterar todo o documento.
  public static putRestaurant(req: restify.Request, res: restify.Response, next: restify.Next) {
    // Com essa opção, o mongoose fará o update completo, ou seja, o conteùdo do body será o novo documento.
    // Se esquecer do campo password por exemplo, o novo documento no mongo não o terá.
    const ops = {overwrite: true, runValidators: true};
    Restaurants.update({_id: req.params.id}, req.body, ops).exec().then(result => {
      if(result.n)
        return Restaurants.findById(req.params.id).then(rest => {
          res.json({
            status: 'success',
            message: rest
          });
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
  public static patchRestaurant(req: restify.Request, res: restify.Response, next: restify.Next) {
    const ops = {runValidators: true, new: true} // Indica para o findByIdAndUpdate retorna o novo documento.
    Restaurants.findByIdAndUpdate(req.params.id, req.body, ops).then(rest => {
      if(rest) {
        res.json({
          status: 'success',
          message: rest
        });
        return next();
      }
      res.status(404);
      res.json({'erro': 'ERROR'});
      return next();
    }).catch(next);
  }

  // Deleta um restaurante.
  public static deleteRestaurant(req: restify.Request, res: restify.Response, next: restify.Next) {
    Restaurants.findByIdAndRemove(req.params.id).then(rest => {
      if(rest)
      res.json({
        status: 'success',
        message: rest
      });
      else {
        res.status(404);
        res.json({"msg": false});
      }

      return next();

    })
    .catch(next);
   
  }

  // Retorna o menu todo restaurante.
  public static getMenu(req: restify.Request, res: restify.Response, next: restify.Next) {
    // '+menu' é uma projeção que indica que o campo menu que está marcado como select: false é pra ser retornado.
    // 'name _id' só terona o name o _id.
    Restaurants.findById(req.params.id, '-_id -name +menu').then(rest => {
      if(rest) {
        res.json({
          status: 'success',
          message: rest
        });
        return next();
      }
      else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'menu não encontrado'
        });
      }
    })
    .catch(next);
  }

  // Insere um array do tipo menu.
  public static putReplaceMenu(req: restify.Request, res: restify.Response, next: restify.Next) {
    Restaurants.findById(req.params.id).then(rest => {
      if(rest) {
        rest.menu = req.body // array de menu.
        rest.save().then(restVal => { // insere o menu no restaurante
          res.json({
            status: 'success',
            message: restVal
          });
          return next();
        })
        .catch(next);
      }
      else {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Não foi possível inserir o menu'
        });
      }
    })
    .catch(next);
  }

}

// const restaurantController = new RestaurantsController();
// export default restaurantController; 