import { randomUUID } from 'node:crypto';

export type Replace<T, R> = Omit<T, keyof R> & R;

export class ReportEntity {
  public readonly id: string;
  startDate: Date;
  endDate: Date;
  totalSales: number;
  totalAmount: number;
  csvUrl: string;

  constructor(props: Omit<ReportEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
    this.csvUrl = `${process.env.BASE_URL}:${process.env.SERVER_PORT}/report/${this.id}`;
  }
}
