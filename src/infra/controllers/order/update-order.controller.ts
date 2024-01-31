import {
  Controller,
  Patch,
  Body,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { UpdateOrderDto } from 'src/infra/dtos/order/update-order-dto';
import { UpdateOrderUseCase } from 'src/domain/order/use-cases/update-order-use-case';

@ApiBearerAuth()
@ApiTags('order')
@Controller('/order/:id')
export class UpdateOrderController {
  constructor(private registerUserUseCase: UpdateOrderUseCase) {}
  @Roles(UserType.ADMIN)
  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'User Order Updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: UpdateOrderDto, @Param('id') id: string) {
    const { status } = body;

    try {
      const result = await this.registerUserUseCase.execute({
        id,
        status,
      });

      return { data: result.order };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
