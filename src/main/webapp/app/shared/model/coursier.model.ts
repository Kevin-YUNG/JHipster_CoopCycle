import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface ICoursier {
  id?: number;
  firstname?: string;
  lastname?: string;
  mail?: string;
  phone?: string;
  reviews?: number;
  utilisateur?: IUtilisateur;
}

export class Coursier implements ICoursier {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public mail?: string,
    public phone?: string,
    public reviews?: number,
    public utilisateur?: IUtilisateur
  ) {}
}
