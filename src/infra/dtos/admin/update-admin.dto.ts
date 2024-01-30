import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
