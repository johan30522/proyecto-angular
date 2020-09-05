
import { UserProfile } from './user.profile.model';
export class Enroll_Opportunity {
    id: number;
    idOpp: number;
    user: UserProfile[];

    constructor(enroll_Opportunity?: Partial<Enroll_Opportunity>) {
        Object.assign(this, enroll_Opportunity);
      }
}


  