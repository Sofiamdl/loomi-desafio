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
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';
import { RemoveFromCartUseCase } from 'src/domain/cart/use-cases/remove-from-cart-use-case';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('/item/:id')
export class RemoveItemController {
  constructor(private useCase: RemoveFromCartUseCase) {}
  @Roles(UserType.ADMIN, UserType.CLIENT)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Item Removed From Cart.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Item Id' })
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
