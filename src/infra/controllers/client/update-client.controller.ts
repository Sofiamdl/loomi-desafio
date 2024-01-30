// import {
//   Controller,
//   Patch,
//   Body,
//   HttpStatus,
//   HttpCode,
//   Param,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { BadRequestException } from '@nestjs/common';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/decorators/roles.decorator';
// import { UpdateAdminDto } from '../../dtos/admin/update-admin.dto';
// import { UpdateAdminUseCase } from 'src/domain/admin/use-cases/update-admin-use-case';

// @ApiBearerAuth()
// @ApiTags('admin')
// @Controller('/admin/:id')
// export class UpdateUserController {
//   constructor(private registerUserUseCase: UpdateAdminUseCase) {}
//   @Roles(UserType.ADMIN)
//   @Patch()
//   @HttpCode(HttpStatus.OK)
//   @ApiResponse({
//     status: 201,
//     description: 'User Admin Updated.',
//   })
//   @ApiResponse({ status: 400, description: 'Bad Request.' })
//   @ApiResponse({ status: 401, description: 'Unauthorized.' })
//   @ApiResponse({
//     status: 500,
//     description: 'Internal server error.',
//   })
//   async handle(@Body() body: UpdateAdminDto, @Param('id') id: string) {
//     const { name } = body;

//     try {
//       const result = await this.registerUserUseCase.execute({
//         id,
//         name,
//       });

//       return { data: result.admin };
//     } catch (err) {
//       throw new BadRequestException();
//     }
//   }
// }
