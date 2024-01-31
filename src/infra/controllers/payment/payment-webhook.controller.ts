import { Controller, Post, Body } from '@nestjs/common';
import { CancelPaymentUseCase } from 'src/domain/payment/use-cases/cancel-payment-use-case';

// se der tempo mudar estrutura de código
@Controller('webhook')
export class WebhookController {
  constructor(private readonly useCase: CancelPaymentUseCase) {}

  @Post('stripe')
  async handleStripeWebhook(@Body() body: any) {
    const event = body;

    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent succeeded:', paymentIntent);
          break;
        case 'payment_intent.payment_failed':
          // [MUDA] colocar de volta no produto se o pagamento for cancelado
          const paymentFailedIntent = event.data.object;
          console.log('PaymentIntent payment failed:', paymentFailedIntent);
          break;

        default:
          console.warn(`Unhandled event type: ${event.type}`);
          break;
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
    }
  }
}
