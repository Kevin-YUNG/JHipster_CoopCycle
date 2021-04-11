import { IPanier } from 'app/shared/model/panier.model';
import { ICommerce } from 'app/shared/model/commerce.model';

export interface IUtilisateur {
  id?: number;
  name?: string;
  firstname?: string;
  mail?: string;
  tel?: string;
  paniers?: IPanier[];
  commerce?: ICommerce;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public name?: string,
    public firstname?: string,
    public mail?: string,
    public tel?: string,
    public paniers?: IPanier[],
    public commerce?: ICommerce
  ) {}
}
