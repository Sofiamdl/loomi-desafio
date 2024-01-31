import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentGateway } from '../../../domain/payment/gateway/payment-gateway';

@Injectable()
export class PaymentService implements PaymentGateway {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    const confirmedIntent =
      await this.stripe.paymentIntents.confirm(paymentIntentId);
    return confirmedIntent;
  }
}
