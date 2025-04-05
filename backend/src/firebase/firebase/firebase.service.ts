import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}

  async uploadImage(
    filePath: string,
    destination: string = 'gs://dazzling-seat-362406.appspot.com/tour images',
  ): Promise<string> {
    const bucket = this.firebaseApp
      .storage()
      .bucket('dazzling-seat-362406.appspot.com');

    try {
      // Upload the file to Firebase Storage
      await bucket.upload(filePath, {
        destination,
        public: true, // Make the file publicly accessible,
        metadata: {
          contentType: 'images/png',
        },
      });

      // Generate the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
      return publicUrl;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }
}
