import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from 'src/domain/client/use-cases/register-user-use-case';
import { BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/infra/dtos/users/create-user.dto';
import { UserType } from '@prisma/client';

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
        type: UserType.CLIENT,
      });

      this.mailerService.sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: 'Password Confirmation',
        text: 'Your code is:',
        html: '<h1>Confirm<h1>',
      });

      return { data: result.user };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
