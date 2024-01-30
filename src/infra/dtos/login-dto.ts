import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  password: string;
}
