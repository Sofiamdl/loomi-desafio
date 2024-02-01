import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/domain/client/use-cases/register-user-use-case';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'src/infra/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AdminModule } from './controllers/admin/admin.module';
import { ClientModule } from './controllers/client/client.module';
import { ProductModule } from './controllers/product/product.module';
import { OrderModule } from './controllers/order/order.module';
import { CartModule } from './controllers/cart/cart.module';
import { PaymentController } from './controllers/payment/payment.controller';
import { ConfirmPaymentController } from './controllers/payment/confirm-payment.controller';
import { CreateIntentUseCase } from 'src/domain/payment/use-cases/create-intent-use-case';
import { PaymentService } from './controllers/payment/stripe.service';
import { WebhookController } from './controllers/payment/payment-webhook.controller';
import { ReportModule } from './controllers/report/report.module';
import { WebhookUseCase } from 'src/domain/payment/use-cases/webhook-use-case';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdminModule,
    ClientModule,
    ProductModule,
    OrderModule,
    CartModule,
    ReportModule,
  ],
  providers: [
    RegisterUserUseCase,
    CreateIntentUseCase,
    WebhookUseCase,
    PaymentService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [PaymentController, ConfirmPaymentController, WebhookController],
})
export class HttpModule {}
