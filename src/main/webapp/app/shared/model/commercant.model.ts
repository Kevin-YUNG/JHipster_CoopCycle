export interface ICommercant {
  id?: number;
  adresse?: string;
}

export class Commercant implements ICommercant {
  constructor(public id?: number, public adresse?: string) {}
}
