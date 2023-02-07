import { ApiProperty } from '@nestjs/swagger';

class UrlFromS3 {
  @ApiProperty({ type: String })
  key: string;
  @ApiProperty({ type: String })
  publicUrl: string;
}
export class UploadSwanggerDto {
  @ApiProperty({ type: UrlFromS3 })
  image: UrlFromS3;
  @ApiProperty({ type: [UrlFromS3] })
  linkImageDetails: [UrlFromS3];
}
