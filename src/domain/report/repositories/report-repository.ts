import { ReportEntity } from '../entities/report.entity';

export abstract class ReportRepository {
  abstract create(report: ReportEntity): Promise<ReportEntity>;
  abstract generate(startDate: Date, endDate: Date): Promise<any>;
  // abstract findAll(query: IQueryFindAllOrder): Promise<[Order]>;
  // abstract findById(id: string): Promise<Order>;
  // abstract update(
  //   id: string,
  //   data: {
  //     status?: OrderStatus;
  //     payment_intent?: string;
  //     total?: number;
  //   },
  // ): Promise<Order>;
  // abstract delete(id: string): Promise<void>;
}
