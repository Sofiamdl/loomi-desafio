import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @ApiProperty()
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  @ApiProperty()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}
