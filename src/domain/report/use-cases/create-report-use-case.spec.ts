import { describe, expect, it, vi } from 'vitest';
import { AsMock } from 'src/core/logic/AsMock';

import { CreateReportUseCase } from './create-report-use-case';
import { ReportRepository } from '../repositories/report-repository';

describe('should successfully create product ', () => {
  it('should generate a report entity with the correct start and end dates, total sales and total amount when valid dates are provided', async () => {
    // Arrange
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');
    const generatedRepo = [
      { total_quantity_sold: 100, total_total_sold: 1000 },
    ];

    const repositoryMock = {
      generate: vi.fn().mockResolvedValue(generatedRepo),
      create: vi.fn().mockResolvedValue({
        startDate,
        endDate,
        totalSales: 1000,
        totalAmount: 100,
        csvUrl: 'csv',
      }),
    };

    const createReportUseCase = new CreateReportUseCase(
      AsMock<ReportRepository>(repositoryMock),
    );

    const response = await createReportUseCase.execute({ startDate, endDate });

    expect(repositoryMock.generate).toHaveBeenCalled();
    expect(repositoryMock.create).toHaveBeenCalled();
    expect(response.report.startDate).toEqual(startDate);
    expect(response.report.endDate).toEqual(endDate);
    expect(response.report.totalSales).toEqual(1000);
    expect(response.report.totalAmount).toEqual(100);
  });
});
