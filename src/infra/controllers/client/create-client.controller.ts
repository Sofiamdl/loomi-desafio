import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';
import { CreateClientDto } from 'src/infra/dtos/client/create-client-dto';
import { RegisterClientUseCase } from 'src/domain/client/use-cases/create-client-use-case';

@IsPublic()
@Controller('/client')
@ApiTags('client')
export class CreateClientController {
  constructor(private useCase: RegisterClientUseCase) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'User Client Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(@Body() body: CreateClientDto) {
    const { email, name, password, fullName, contact, address } = body;
    try {
      const result = await this.useCase.execute({
        email,
        name,
        password,
        fullName,
        contact,
        address,
      });

      return { data: result.user };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
