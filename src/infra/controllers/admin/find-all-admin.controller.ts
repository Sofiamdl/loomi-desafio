import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindAdminsUseCase } from 'src/domain/admin/use-cases/find-all-admin-use-case';

@Controller('/admin')
@ApiTags('admin')
export class FindAllUserController {
  constructor(private useCase: FindAdminsUseCase) {}
  @Roles(UserType.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Admins Listed.',
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
