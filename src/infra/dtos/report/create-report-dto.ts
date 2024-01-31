import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  endDate: Date;
}
