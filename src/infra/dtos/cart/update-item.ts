import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}
