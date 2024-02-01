import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './stripe.service';
import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';
@IsPublic()
@ApiTags('payment')
@Controller('payment')
export class ConfirmPaymentController {
  constructor(private useCase: PaymentService) {}
  @Post('confirm-intent/:id')
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
      const clientSecret = await this.useCase.confirmPaymentIntent(id);
      return { clientSecret };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
