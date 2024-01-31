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
import { UpdateProductDto } from 'src/infra/dtos/product/update-product-dto';
import { UpdateProductUseCase } from 'src/domain/product/use-cases/update-product-use-case';

@ApiBearerAuth()
@ApiTags('product')
@Controller('/product/:id')
export class UpdateProductController {
  constructor(private registerUserUseCase: UpdateProductUseCase) {}
  @Roles(UserType.ADMIN)
  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'User Product Updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: UpdateProductDto, @Param('id') id: string) {
    const { description, name, price, quantity } = body;

    try {
      const result = await this.registerUserUseCase.execute({
        id,
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
