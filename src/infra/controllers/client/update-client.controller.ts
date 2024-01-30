import {
  Controller,
  Patch,
  Body,
  HttpStatus,
  HttpCode,
  Param,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/infra/auth/decorators/roles.decorator';
import { UpdateClientDto } from 'src/infra/dtos/client/update-client-dto';
import { UpdateClientUseCase } from 'src/domain/user/use-cases/update-client-use-case';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';

@ApiBearerAuth()
@ApiTags('client')
@Controller('/client/:id')
export class UpdateClientController {
  constructor(private useCase: UpdateClientUseCase) {}
  @Roles(UserType.CLIENT, UserType.ADMIN)
  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'User Client Updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(
    @Body() body: UpdateClientDto,
    @Param('id') id: string,
    @Request() req: AuthRequest,
  ) {
    const { fullName, contact, address } = body;

    try {
      const result = await this.useCase.execute({
        id,
        fullName,
        contact,
        address,
        idOfCurrentUser: req.user.id,
      });

      return { data: result.client };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
