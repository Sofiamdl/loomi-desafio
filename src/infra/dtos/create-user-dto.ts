import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  password: string;
}
