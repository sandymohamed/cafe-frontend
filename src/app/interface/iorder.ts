import { Iprodcut } from './iprodcut';
import { Iuser } from './iuser';

export interface Iorder {
  _id: string;
  user: Iuser;
  date: Date;
  status: string;
  amount: number;
  action: string;
  room: number;
  ext: number;
  Prodeuct: Iprodcut[];
}
