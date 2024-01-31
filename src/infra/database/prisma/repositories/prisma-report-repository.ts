import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { ReportRepository } from 'src/domain/report/repositories/report-repository';
import { ReportEntity } from 'src/domain/report/entities/report.entity';

@Injectable()
export class ReportRepositoryImpl implements ReportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async generate(startDate: Date, endDate: Date): Promise<any> {
    const reportQueried = this.prismaService.$queryRaw`
      SELECT 
      products.id AS id, 
      products.name AS name, 
      products.price AS price,
      SUM(itens.quantity) AS quantity_sold,
      SUM(itens.subtotal) AS total_sold,
      (SELECT SUM(quantity) FROM itens) AS total_quantity_sold,
      (SELECT SUM(subtotal) FROM itens) AS total_total_sold
      FROM orders 
      INNER JOIN itens ON orders.id = itens."orderId" 
      INNER JOIN products ON itens."productId" = products.id 
      WHERE orders.created_at >= DATE(${startDate}) AND orders.created_at <= DATE(${endDate})
      GROUP BY 1, 2
      ORDER BY 2 ASC
    `;
    return reportQueried;
  }

  async create(report: ReportEntity): Promise<ReportEntity> {
    const reportCreated = await this.prismaService.report.create({
      data: report,
    });
    return reportCreated;
  }
}
