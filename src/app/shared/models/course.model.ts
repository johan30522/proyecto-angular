import { Student } from './student.model';

export class Course {
  id: number;
  name: string;
  author: string;
  students: Student[];
}
