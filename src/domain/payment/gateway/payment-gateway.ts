import Stripe from 'stripe';

export abstract class PaymentGateway {
  abstract createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent>;
  abstract confirmPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent>;
}
