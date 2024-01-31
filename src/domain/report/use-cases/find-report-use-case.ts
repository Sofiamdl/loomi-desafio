import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { ReportRepository } from '../repositories/report-repository';
import { ReportEntity } from '../entities/report.entity';
import { Response } from 'express';
import * as fs from 'fs';

export interface FindReportUseCaseCaseRequest {
  id: string;
  res: Response;
}

export interface FindReportUseCaseCaseResponse {
  report: ReportEntity;
}

@Injectable()
export class FindReportUseCase
  implements
    UseCase<FindReportUseCaseCaseRequest, FindReportUseCaseCaseResponse>
{
  constructor(private repository: ReportRepository) {}

  async execute(
    request: FindReportUseCaseCaseRequest,
  ): Promise<FindReportUseCaseCaseResponse> {
    const { id, res } = request;

    const report = await this.repository.findById(id);
    if (!report) throw new NotFoundException('Report With Id Not Found');

    const path = `reports/${id}.csv`;

    if (!fs.existsSync(path)) {
      throw new NotFoundException('Report Not Found');
    }

    res.download(path, `${id}.csv`);

    return { report };
  }
}
