import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindAllProductUseCase } from 'src/domain/product/use-cases/find-all-product-use-case';
import { QueryProductDto } from 'src/infra/dtos/product/query-product-dto';

@ApiBearerAuth()
@ApiTags('product')
@Controller('/product')
export class FindAllProductController {
  constructor(private useCase: FindAllProductUseCase) {}

  @Roles(UserType.ADMIN, UserType.CLIENT)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Products Listed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiQuery({ name: 'page', type: 'number', required: true })
  @ApiQuery({ name: 'pageAmount', type: 'number', required: true })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'description', type: 'string', required: false })
  @ApiQuery({ name: 'isAvailable', type: 'bool', required: false })
  @ApiQuery({ name: 'maxPrice', type: 'number', required: false })
  @ApiQuery({ name: 'minPrice', type: 'number', required: false })
  async handle(@Query() query: QueryProductDto) {
    try {
      const result = await this.useCase.execute(query);

      return { data: result };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
