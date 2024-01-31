import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { AddToCartDto } from 'src/infra/dtos/cart/add-to-cart-dto';
import { AddToCartUseCase } from 'src/domain/cart/add-to-cart-use-case';

@Controller('/add-item/:id')
@ApiTags('cart')
export class AddItemController {
  constructor(private useCase: AddToCartUseCase) {}
  @Post()
  @Roles(UserType.ADMIN, UserType.CLIENT)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'Item Added to Cart.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: AddToCartDto) {
    const { productId, orderId, quantity } = body;
    try {
      const result = await this.useCase.execute({
        productId,
        orderId,
        quantity,
      });

      return { data: result.item };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
