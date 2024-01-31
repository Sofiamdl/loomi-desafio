import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { UseCase } from 'src/core/use-case';
import { ReportRepository } from './repositories/report-repository';

export interface CreateReportUseCaseRequest {
  startDate: Date;
  endDate: Date;
}

export interface CreateReportUseCaseResponse {
  report: Report;
}

@Injectable()
export class CreateReportUseCase
  implements UseCase<CreateReportUseCaseRequest, CreateReportUseCaseResponse>
{
  constructor(private repository: ReportRepository) {}

  async execute(
    request: CreateReportUseCaseRequest,
  ): Promise<CreateReportUseCaseResponse> {
    const { startDate, endDate } = request;

    const report = new Report({
      startDate,
      endDate,
      totalAmount: 0,
      totalSales: 0,
      csvUrl: '111',
    });

    await this.repository.create(report);
    return { report };
  }
}
