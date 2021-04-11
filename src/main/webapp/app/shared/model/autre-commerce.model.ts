export interface IAutreCommerce {
  id?: number;
  name?: string;
}

export class AutreCommerce implements IAutreCommerce {
  constructor(public id?: number, public name?: string) {}
}
