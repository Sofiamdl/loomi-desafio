import { ApiProperty } from '@nestjs/swagger';

export class QueryProductDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageAmount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  maxPrice: number;

  @ApiProperty()
  minPrice: number;
}
