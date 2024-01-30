import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { DeleteClientUseCase } from 'src/domain/user/use-cases/delete-client-use-case';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';

@ApiBearerAuth()
@ApiTags('client')
@Controller('/client/:id')
export class DeleteClientController {
  constructor(private useCase: DeleteClientUseCase) {}

  @Roles(UserType.CLIENT, UserType.ADMIN)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Client Deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Client Id' })
  async handle(@Param('id') id: string, @Request() req: AuthRequest) {
    try {
      const result = await this.useCase.execute({
        id,
        idOfCurrentUser: req.user.id,
      });

      return { data: result };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
