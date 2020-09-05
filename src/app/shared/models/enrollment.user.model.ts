import { Oportunity } from './oportunity';
import { User } from './user';
export class Enroll_User {
    id:number;
    idUser:number;
    idOpportunity: number;
    constructor(enroll_User?: Partial<Enroll_User>) {
      Object.assign(this, enroll_User);
    }
  }
  