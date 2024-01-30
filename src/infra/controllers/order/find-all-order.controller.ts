import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { QueryOrderDto } from 'src/infra/dtos/order/query-order-dto';
import { FindAllOrderUseCase } from 'src/domain/order/use-cases/find-all-order-use-case';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';

@ApiBearerAuth()
@ApiTags('order')
@Controller('/order')
export class FindAllOrderController {
  constructor(private useCase: FindAllOrderUseCase) {}

  @Roles(UserType.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Orders Listed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiQuery({ name: 'page', type: 'number', required: true })
  @ApiQuery({ name: 'pageAmount', type: 'number', required: true })
  @ApiQuery({ name: 'fromDate', type: 'Date', required: false })
  @ApiQuery({ name: 'toDate', type: 'Date', required: false })
  @ApiQuery({ name: 'status', type: 'OrderStatus', required: false })
  @ApiQuery({ name: 'maxPrice', type: 'number', required: false })
  @ApiQuery({ name: 'minPrice', type: 'number', required: false })
  @ApiQuery({ name: 'clientId', type: 'string', required: false })
  async handle(@Query() query: QueryOrderDto, @Request() req: AuthRequest) {
    try {
      const result = await this.useCase.execute({
        query,
        idOfCurrentUser: req.user.id,
      });

      return { data: result };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
