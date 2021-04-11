import { ICourse } from 'app/shared/model/course.model';

export interface ICoursier {
  id?: number;
  firstname?: string;
  lastname?: string;
  mail?: string;
  phone?: string;
  reviews?: number;
  courses?: ICourse[];
  course?: ICourse;
}

export class Coursier implements ICoursier {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public mail?: string,
    public phone?: string,
    public reviews?: number,
    public courses?: ICourse[],
    public course?: ICourse
  ) {}
}
