import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateReportController } from './create-report.controller';
import { CreateReportUseCase } from 'src/domain/report/create-report-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateReportController],
  providers: [CreateReportUseCase],
})
export class ReportModule {}
