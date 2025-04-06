import { AllConfigType } from '@/config/config.type';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (config: ConfigService<AllConfigType>) => {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.get<string>('firebase.projectId', { infer: true }),
        clientEmail: config.get<string>('firebase.clientEmail', {
          infer: true,
        }),
        privateKey: config
          .get<string>('firebase.privateKey', { infer: true })
          ?.replace(/\\n/g, '\n'),
      }),
      storageBucket: config.get<string>('firebase.storageBucket', {
        infer: true,
      }),
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
