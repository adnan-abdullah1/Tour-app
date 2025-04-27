import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { IngestModule } from './ingest/ingest.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [
    // UserModule,
    // HealthModule,
    AuthModule,
    // HomeModule,
    // PostModule,
    PackageModule,
    IngestModule,
    // PropertyModule,
  ],
})
export class ApiModule {}
