import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { CreateProductDto } from 'src/infra/dtos/product/creat-product-dto';
import { CreateProductUseCase } from 'src/domain/product/use-cases/create-product-use-case';

@ApiBearerAuth()
@Controller('/product')
@ApiTags('product')
export class CreateProductController {
  constructor(private useCase: CreateProductUseCase) {}
  @Roles(UserType.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Product Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: CreateProductDto) {
    const { description, name, price, quantity } = body;

    try {
      const result = await this.useCase.execute({
        description,
        name,
        price,
        quantity,
      });

      return { data: result.product };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
