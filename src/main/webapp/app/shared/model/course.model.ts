import { Moment } from 'moment';
import { ICoursier } from 'app/shared/model/coursier.model';
import { ICommande } from 'app/shared/model/commande.model';
import { IPanier } from 'app/shared/model/panier.model';

export interface ICourse {
  id?: number;
  prix?: number;
  distance?: number;
  date?: Moment;
  coursier?: ICoursier;
  commandes?: ICommande[];
  panier?: IPanier;
  coursier?: ICoursier;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public prix?: number,
    public distance?: number,
    public date?: Moment,
    public coursier?: ICoursier,
    public commandes?: ICommande[],
    public panier?: IPanier,
    public coursier?: ICoursier
  ) {}
}
