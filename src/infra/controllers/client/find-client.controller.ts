import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindClientUseCase } from 'src/domain/client/use-cases/find-client-use-case';

@ApiBearerAuth()
@Controller('/client/:id')
@ApiTags('client')
export class FindClientController {
  constructor(private useCase: FindClientUseCase) {}
  @Roles(UserType.CLIENT, UserType.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Client Found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Client Id' })
  async handle(@Param('id') id: string) {
    try {
      const result = await this.useCase.execute({ id });

      return { data: result };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
