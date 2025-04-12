import { MediaType } from '@/api/package/types/package.types';
import { Bucket } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  bucket: Bucket;
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}

  async uploadPackageMedia(
    files: Express.Multer.File[],
    packageId: string,
  ): Promise<Array<MediaType>> {
    this.bucket = this.firebaseApp.storage().bucket();

    console.log('imitate media upload');

    const uploadPromises = files.map((file) => {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = `package/${packageId}/${fileName}`;
      const fileUpload = this.bucket.file(filePath);

      return new Promise<MediaType>((resolve, reject) => {
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on('error', (error) => {
          reject(`Unable to upload file, something went wrong: ${error}`);
        });

        blobStream.on('finish', async () => {
          try {
            await fileUpload.makePublic();
            const publicUrl = `${process.env.FIREBASE_FILE_URL}${this.bucket.name}/${filePath}`;
            console.log('Successfully uploaded to firebase');
            resolve({ url: publicUrl, path: filePath });
          } catch (error) {
            reject(`Failed to make file public: ${error}`);
          }
        });

        blobStream.end(file.buffer);
      });
    });

    return await Promise.all(uploadPromises);
  }
}
