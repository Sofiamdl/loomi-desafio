import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: GLfloat;

  @ApiProperty()
  quantity: number;
}
