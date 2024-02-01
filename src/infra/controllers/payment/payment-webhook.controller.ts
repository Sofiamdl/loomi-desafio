import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebhookUseCase } from 'src/domain/payment/use-cases/webhook-use-case';
import { IsPublic } from 'src/infra/auth/decorators/is-public.decorator';

@IsPublic()
@ApiTags('payment')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly useCase: WebhookUseCase) {}

  @Post('stripe')
  async handleStripeWebhook(@Body() body: any) {
    const event = body;
    try {
      const result = await this.useCase.execute({
        event,
      });
      return { result };
    } catch (error) {
      console.error('Error handling webhook event:', error);
    }
  }
}
