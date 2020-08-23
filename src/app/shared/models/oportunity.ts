import { Job } from './jobs.model';

export class Oportunity {
  id: number;
  title: string;
  creationDate: Date;
  dueDate: Date;
  requiredSkills:string;
  consideredSkills:string;
  job:Job
  status:string;


}
