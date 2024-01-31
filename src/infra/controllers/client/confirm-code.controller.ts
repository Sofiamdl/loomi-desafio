// import { Controller, Body, HttpStatus, HttpCode, Post } from '@nestjs/common';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { BadRequestException } from '@nestjs/common';

// import { UpdateClientUseCase } from 'src/domain/client/use-cases/update-client-use-case';
// import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';
// import { ConfirmCodeDto } from 'src/infra/dtos/client/confirm-code-dto';

// @IsPublic()
// @ApiTags('client')
// @Controller('/confirm-code')
// export class UpdateClientController {
//   constructor(private useCase: ConfirmCodeUseCase) {}

//   @Post()
//   @HttpCode(HttpStatus.OK)
//   @ApiResponse({
//     status: 201,
//     description: 'User Client Confirmed.',
//   })
//   @ApiResponse({ status: 400, description: 'Bad Request.' })
//   @ApiResponse({ status: 401, description: 'Unauthorized.' })
//   @ApiResponse({
//     status: 500,
//     description: 'Internal server error.',
//   })
//   async handle(@Body() body: ConfirmCodeDto) {
//     const { email, code } = body;
//     try {
//       const result = await this.useCase.execute({
//         email,
//         code,
//       });

//       return { data: result.client };
//     } catch (err) {
//       throw new BadRequestException();
//     }
//   }
// }
