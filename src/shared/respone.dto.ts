import { ApiProperty } from '@nestjs/swagger';

export class StatusRespone {
  @ApiProperty({ type: Boolean })
  success: boolean;
}
