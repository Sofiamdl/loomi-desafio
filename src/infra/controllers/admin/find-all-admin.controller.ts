import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { FindAdminsUseCase } from 'src/domain/admin/use-cases/find-all-admin-use-case';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('/admin')
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
      console.log('aq');
      const result = await this.useCase.execute();

      return { data: result };
    } catch (err) {
      console.log('eo');
      throw new BadRequestException();
    }
  }
}
