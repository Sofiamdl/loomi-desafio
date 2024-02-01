import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from 'src/domain/client/use-cases/register-user-use-case';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from 'src/infra/dtos/users/create-user.dto';
import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';

// @ApiBearerAuth()
@IsPublic()
@Controller('/admin')
@ApiTags('admin')
export class CreateAdminController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}
  // @Roles(UserType.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'User Admin Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: CreateUserDto) {
    const { email, name, password } = body;

    try {
      const result = await this.registerUserUseCase.execute({
        email,
        name,
        password,
        type: UserType.ADMIN,
      });

      return { data: result.user };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
