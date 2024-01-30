// import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
// import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { BadRequestException } from '@nestjs/common';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/decorators/roles.decorator';
// import { FindProductUseCase } from 'src/domain/product/use-cases/find-product-use-case';

// @ApiBearerAuth()
// @Controller('/product/:id')
// @ApiTags('product')
// export class FindProductController {
//   constructor(private useCase: FindProductUseCase) {}
//   @Roles(UserType.ADMIN, UserType.CLIENT)
//   @Get()
//   @HttpCode(HttpStatus.OK)
//   @ApiResponse({
//     status: 200,
//     description: 'Product Found.',
//   })
//   @ApiResponse({ status: 400, description: 'Bad Request.' })
//   @ApiResponse({ status: 401, description: 'Unauthorized.' })
//   @ApiResponse({
//     status: 500,
//     description: 'Internal server error.',
//   })
//   @ApiParam({ name: 'id', type: 'string', description: 'Product Id' })
//   async handle(@Param('id') id: string) {
//     try {
//       const result = await this.useCase.execute({ id });

//       return { data: result };
//     } catch (err) {
//       throw new BadRequestException();
//     }
//   }
// }
