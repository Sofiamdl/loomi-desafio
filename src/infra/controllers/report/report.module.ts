import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateReportController } from './create-report.controller';
import { CreateReportUseCase } from 'src/domain/report/use-cases/create-report-use-case';
import { FindReportController } from './find-report.controller';
import { FindReportUseCase } from 'src/domain/report/use-cases/find-report-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateReportController, FindReportController],
  providers: [CreateReportUseCase, FindReportUseCase],
})
export class ReportModule {}
