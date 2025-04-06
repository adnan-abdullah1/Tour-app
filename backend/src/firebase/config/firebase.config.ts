import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { FirebaseConfig } from './firebase.config.types';

class FirebaseEnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  FIREBASE_PROJECT_ID: string;

  @IsString()
  @IsNotEmpty()
  FIREBASE_PRIVATE_KEY: string;

  @IsString()
  @IsNotEmpty()
  FIREBASE_CLIENT_EMAIL: string;

  @IsString()
  @IsNotEmpty()
  FIREBASE_BUCKET_NAME: string;
}

export default registerAs<FirebaseConfig>('firebase', () => {
  console.info(`Register FirebaseConfig from environment variables`);

  validateConfig(process.env, FirebaseEnvironmentVariablesValidator);

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    storageBucket: process.env.FIREBASE_BUCKET_NAME,
  };
});
