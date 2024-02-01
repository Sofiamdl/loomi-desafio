import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { CreateReportUseCase } from 'src/domain/report/use-cases/create-report-use-case';
import { CreateReportDto } from 'src/infra/dtos/report/create-report-dto';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';

@ApiBearerAuth()
@Controller('/report')
@ApiTags('report')
export class CreateReportController {
  constructor(private useCase: CreateReportUseCase) {}
  @Roles(UserType.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Report Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: CreateReportDto) {
    const { startDate, endDate } = body;
    try {
      const result = await this.useCase.execute({
        startDate,
        endDate,
      });

      return { data: result.report };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
