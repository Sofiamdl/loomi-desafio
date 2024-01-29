import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserDto } from 'src/infra/dtos/create-user-dto';
import { BadRequestException } from '@nestjs/common';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/guards/permission.guard';
// @Roles(UserType.CLIENT)

@Controller('/user')
@ApiTags('user')
export class CreateUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
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
      });

      return { data: result.user };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
