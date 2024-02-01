import {
  Controller,
  Post,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';
import { CreateOrderUseCase } from 'src/domain/order/use-cases/create-order-use-case';

@ApiBearerAuth()
@Controller('/order')
@ApiTags('order')
export class CreateOrderController {
  constructor(private useCase: CreateOrderUseCase) {}
  @Roles(UserType.ADMIN, UserType.CLIENT)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Order Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Request() req: AuthRequest) {
    try {
      const result = await this.useCase.execute({
        id: req.user.id,
      });

      return { data: result.order };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
