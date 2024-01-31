import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CreateIntentUseCase } from 'src/domain/payment/use-cases/create-intent-use-case';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private useCase: CreateIntentUseCase) {}
  @Post('create-intent/:id')
  @Roles(UserType.CLIENT)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    description: 'Payment Intent Created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createPaymentIntent(@Param('id') id: string) {
    try {
      const clientSecret = await this.useCase.execute({
        orderId: id,
      });
      return { clientSecret };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
