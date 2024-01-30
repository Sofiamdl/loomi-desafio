import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { DeleteOrderUseCase } from 'src/domain/order/use-cases/delete-order-use-case';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';

@ApiBearerAuth()
@ApiTags('order')
@Controller('/order/:id')
export class DeleteOrderController {
  constructor(private useCase: DeleteOrderUseCase) {}
  @Roles(UserType.ADMIN, UserType.CLIENT)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Order Deleted.',
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
