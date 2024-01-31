import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class QueryOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  pageAmount: number;

  @ApiProperty()
  status: OrderStatus;

  @ApiProperty()
  fromDate: Date;

  @ApiProperty()
  toDate: Date;

  @ApiProperty()
  maxPrice: number;

  @ApiProperty()
  minPrice: number;

  @ApiProperty()
  clientId: string;
}
