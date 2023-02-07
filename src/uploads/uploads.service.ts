import { Injectable, Logger } from '@nestjs/common';
import { BUCKETPATH_ENUM } from './uploads.constant';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadsService {
  logger = new Logger(UploadsService.name);

  configS3 = {
    AWS_S3_BUCKET_NAME: process.env.BUCKET_NAME,
    AWS_S3_END_POINT: process.env.AWS_END_POINT,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  };

  async upload(files: Express.Multer.File, bucketPath: BUCKETPATH_ENUM) {
    const image = files['image'][0];
    const imageDetails = files['imageDetails'];
    const linkFromW3 = {};
    let urlKey = '';

    if (image) {
      if (bucketPath === BUCKETPATH_ENUM['ITEM-IMAGES']) {
        urlKey = `${bucketPath}/avatar/${Date.now()}-${image.originalname}`;
      }

      if (bucketPath === BUCKETPATH_ENUM['CATEGORY-IMAGES']) {
        urlKey = `${bucketPath}/banner/${Date.now()}-${image.originalname}`;
      }
      const imageUpload = await this.uploadS3(image.buffer, urlKey);
      linkFromW3['image'] = imageUpload;
    }

    if (imageDetails) {
      const linkImageDetails = [];
      if (bucketPath === BUCKETPATH_ENUM['ITEM-IMAGE']) {
        console.log(imageDetails.length);

        for (let i = 0; i < imageDetails.length; i++) {
          urlKey = `${bucketPath}/detail/${Date.now()}-${
            imageDetails[i].originalname
          }`;

          linkImageDetails.push(
            await this.uploadS3(imageDetails[i].buffer, urlKey),
          );
        }
      }
      linkFromW3['linkImageDetails'] = linkImageDetails;
    }
    return linkFromW3;
  }

  async uploadS3(file, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.configS3.AWS_S3_BUCKET_NAME,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          this.logger.error(err);
          reject(err.message);
        }
        resolve({
          key: data.Key,
          publicUrl: data.Location,
        });
      });
    });
  }

  getS3() {
    return new S3({
      endpoint: this.configS3.AWS_S3_END_POINT,
      accessKeyId: this.configS3.AWS_ACCESS_KEY_ID,
      secretAccessKey: this.configS3.AWS_SECRET_ACCESS_KEY,
    });
  }
}
