import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { ReportRepository } from 'src/domain/report/repositories/report-repository';
import { Report } from 'src/domain/report/entities/report.entity';

@Injectable()
export class ReportRepositoryImpl implements ReportRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(report: Report): Promise<Report> {
    const reportCreated = await this.prismaService.report.create({
      data: report,
    });
    return reportCreated;
    // const reportQueried = this.prismaService.$queryRaw`
    // `;
    // return reportQueried;
  }
}
