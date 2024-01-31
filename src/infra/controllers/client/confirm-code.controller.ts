import { Controller, Body, HttpStatus, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';

import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';
import { ConfirmCodeDto } from 'src/infra/dtos/client/confirm-code-dto';
import { ConfirmCodeUseCase } from 'src/domain/client/use-cases/confirm-code-use-case';

@IsPublic()
@ApiTags('client')
@Controller('/confirm-code')
export class ConfirmCodeController {
  constructor(private useCase: ConfirmCodeUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'User Client Confirmed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: ConfirmCodeDto) {
    const { email, code } = body;
    try {
      const result = await this.useCase.execute({
        email,
        code,
      });

      return { data: result.user };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
