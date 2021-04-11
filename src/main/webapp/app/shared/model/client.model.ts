import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IClient {
  id?: number;
  firstname?: string;
  lastname?: string;
  mail?: string;
  phone?: string;
  address?: string;
  utilisateur?: IUtilisateur;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public mail?: string,
    public phone?: string,
    public address?: string,
    public utilisateur?: IUtilisateur
  ) {}
}
