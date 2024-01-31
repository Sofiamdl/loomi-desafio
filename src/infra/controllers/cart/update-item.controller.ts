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
import { UpdateItemDto } from 'src/infra/dtos/cart/update-item';
import { UpdateItemUseCase } from 'src/domain/cart/use-cases/update-item-use-case';
import { AuthRequest } from 'src/infra/auth/models/AuthRequest';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('/item/:id')
export class UpdateItemController {
  constructor(private registerUserUseCase: UpdateItemUseCase) {}
  @Roles(UserType.ADMIN, UserType.CLIENT)
  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'Item Updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async handle(
    @Body() body: UpdateItemDto,
    @Param('id') id: string,
    @Request() req: AuthRequest,
  ) {
    const { quantity } = body;

    try {
      const result = await this.registerUserUseCase.execute({
        id,
        quantity,
        idOfCurrentUser: req.user.id,
      });

      return { data: result.item };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
