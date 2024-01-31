import { randomUUID } from 'node:crypto';

export type Replace<T, R> = Omit<T, keyof R> & R;

export class Report {
  public readonly id: string;
  startDate: Date;
  endDate: Date;
  totalSales: number;
  totalAmount: number;
  csvUrl: string;

  constructor(props: Omit<Report, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }
}
