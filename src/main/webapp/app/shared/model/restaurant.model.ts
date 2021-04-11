import { TypeRestaurant } from 'app/shared/model/enumerations/type-restaurant.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  resto?: TypeRestaurant;
}

export class Restaurant implements IRestaurant {
  constructor(public id?: number, public name?: string, public resto?: TypeRestaurant) {}
}
