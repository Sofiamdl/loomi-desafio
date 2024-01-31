import { Injectable } from '@nestjs/common';
import { ReportEntity } from './entities/report.entity';
import { UseCase } from 'src/core/use-case';
import { ReportRepository } from './repositories/report-repository';
import { createObjectCsvWriter } from 'csv-writer';

export interface CreateReportUseCaseRequest {
  startDate: Date;
  endDate: Date;
}

export interface CreateReportUseCaseResponse {
  report: ReportEntity;
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

    const report = new ReportEntity({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalAmount: 0,
      totalSales: 0,
      csvUrl: '111',
    });

    const newReport = await this.repository.create(report);

    const generatedRepo = await this.repository.generate(startDate, endDate);
    console.log(generatedRepo);
    const csvWriter = createObjectCsvWriter({
      path: `reports/${newReport.id}.csv`,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'NAME' },
        { id: 'price', title: 'PRICE' },
        { id: 'quantity_sold', title: 'QUANTITY SOLD' },
        { id: 'total_sold', title: 'TOTAL SOLD' },
      ],
    });

    await csvWriter.writeRecords(generatedRepo);

    return { report };
  }
}
