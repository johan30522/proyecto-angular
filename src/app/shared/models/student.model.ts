import { Course } from './course.model';
export class Student {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  address?: string;
  active?: boolean;
  courses: Course[];
}
