import { Report } from '../entities/report.entity';

export abstract class ReportRepository {
  abstract create(report: Report): Promise<Report>;
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
