import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { IProduit } from 'app/shared/model/produit.model';
import { ICommande } from 'app/shared/model/commande.model';
import { IPanier } from 'app/shared/model/panier.model';

export interface ICommerce {
  id?: number;
  adresse?: string;
  noteCommerce?: number;
  name?: string;
  utilisateurs?: IUtilisateur[];
  produits?: IProduit[];
  commandes?: ICommande[];
  panier?: IPanier;
  produits?: IProduit[];
}

export class Commerce implements ICommerce {
  constructor(
    public id?: number,
    public adresse?: string,
    public noteCommerce?: number,
    public name?: string,
    public utilisateurs?: IUtilisateur[],
    public produits?: IProduit[],
    public commandes?: ICommande[],
    public panier?: IPanier,
    public produits?: IProduit[]
  ) {}
}
