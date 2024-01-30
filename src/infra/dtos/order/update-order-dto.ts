import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  status: OrderStatus;
}
