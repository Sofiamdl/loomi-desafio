import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  status: string;
}
