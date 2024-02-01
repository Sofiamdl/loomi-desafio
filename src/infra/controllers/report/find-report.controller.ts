import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindReportUseCase } from 'src/domain/report/use-cases/find-report-use-case';
import { Response } from 'express';
// import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';

@ApiBearerAuth()
@Controller('/report/:id')
@ApiTags('report')
export class FindReportController {
  constructor(private useCase: FindReportUseCase) {}
  @Roles(UserType.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Report Found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Report Id' })
  async handle(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.useCase.execute({ id, res });

      return { data: result };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
