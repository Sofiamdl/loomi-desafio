import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindAdminUseCase } from 'src/domain/admin/use-cases/find-admin-use-case';

@ApiBearerAuth()
@Controller('/admin/:id')
@ApiTags('admin')
export class FindUserController {
  constructor(private useCase: FindAdminUseCase) {}
  @Roles(UserType.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Admin Found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Admin Id' })
  async handle(@Param('id') id: string) {
    try {
      const result = await this.useCase.execute({ id });

      return { data: result };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
