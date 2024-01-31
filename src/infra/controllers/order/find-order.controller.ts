import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindOrderUseCase } from 'src/domain/order/use-cases/find-order-use-case';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';

@ApiBearerAuth()
@Controller('/order/:id')
@ApiTags('order')
export class FindOrderController {
  constructor(private useCase: FindOrderUseCase) {}
  @Roles(UserType.ADMIN, UserType.CLIENT)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Order Found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Order Id' })
  async handle(@Param('id') id: string, @Request() req: AuthRequest) {
    try {
      const result = await this.useCase.execute({
        id,
        idOfCurrentUser: req.user.id,
      });

      return { data: result };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
