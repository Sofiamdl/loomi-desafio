import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from 'src/domain/user/use-cases/register-user-use-case';
import { CreateUserDto } from 'src/infra/dtos/create-user-dto';
import { BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/infra/auth/guards/permission.guard';
// @Roles(UserType.CLIENT)

@Controller('/user')
@ApiTags('user')
export class CreateUserController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private mailerService: MailerService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User Created.',
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

      this.mailerService.sendMail({
        to: 'sofiamelo2610@gmail.com',
        from: process.env.EMAIL,
        subject: 'Password Confirmation',
        text: 'Your code is:',
        html: '<h1>Confirm<h1>',
      });

      return { data: result.user };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
