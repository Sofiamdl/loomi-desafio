import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
