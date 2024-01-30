// import {
//   Controller,
//   Delete,
//   HttpCode,
//   HttpStatus,
//   Param,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { BadRequestException } from '@nestjs/common';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/decorators/roles.decorator';
// import { DeleteProductUseCase } from 'src/domain/product/use-cases/delete-product-use-case';

// @ApiBearerAuth()
// @ApiTags('product')
// @Controller('/product/:id')
// export class DeleteProductController {
//   constructor(private useCase: DeleteProductUseCase) {}
//   @Roles(UserType.ADMIN)
//   @Delete()
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @ApiResponse({
//     status: 204,
//     description: 'Product Deleted.',
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
