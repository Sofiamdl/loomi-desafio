import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindAllClientUseCase } from 'src/domain/client/use-cases/find-all-client-use-case';

@ApiBearerAuth()
@ApiTags('client')
@Controller('/client')
export class FindAllClientController {
  constructor(private useCase: FindAllClientUseCase) {}

  @Roles(UserType.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Clients Listed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle() {
    try {
      const result = await this.useCase.execute();

      return { data: result };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
