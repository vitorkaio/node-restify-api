import * as mongoose from 'mongoose';

export interface MenuItem extends mongoose.Document {
  name: string,
  price: number
};

export interface Restaurant extends mongoose.Document {
  name: string,
  menu: MenuItem[]
};

export interface RestaurantModel extends mongoose.Model<Restaurant> {
  findByName(name: string): Promise<Restaurant>
}

// Schema que será utilizado dentro de outro Schema.
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  menu: {
    type: [menuSchema], // array de objetos do tipo menuSchema
    required: false,
    select: false,
    default: []
  }
});

// Adiciona um método static de pesquisa personalizado ao moongose.
restaurantSchema.statics.findByName = function(name: string) {
  return this.findOne({name}); // {name: name}
}

export const Restaurants = mongoose.model<Restaurant, RestaurantModel>('Restaurant', restaurantSchema);

