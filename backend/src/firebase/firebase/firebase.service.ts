import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}

  async uploadImage(filePath: string, destination: string): Promise<string> {
    const bucket = this.firebaseApp.storage().bucket();
    return Promise.resolve() as unknown as string;
  }
}
