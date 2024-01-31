import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportEntity } from '../entities/report.entity';
import { UseCase } from 'src/core/use-case';
import { ReportRepository } from '../repositories/report-repository';
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
    const generatedRepo = await this.repository.generate(startDate, endDate);

    if (generatedRepo.length <= 0) throw new NotFoundException('No Data Found');

    const report = new ReportEntity({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalAmount: Number(generatedRepo[0].total_quantity_sold),
      totalSales: Number(generatedRepo[0].total_total_sold),
      csvUrl: '111',
    });

    const newReport = await this.repository.create(report);

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
