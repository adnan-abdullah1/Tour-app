import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { PackageService } from '../package/package.service';
import { Affiliate } from './entities/affilates.entity';
import { mockPackages } from './mock.data';

@Injectable()
export class IngestService {
  private readonly axiosInstance: AxiosInstance;
  private readonly logger = new Logger(IngestService.name);

  constructor(
    @InjectModel('Affiliate')
    private readonly AffiliateModel: Model<Affiliate>,
    private httpService: HttpService,
    private readonly packageService: PackageService,
  ) {
    this.axiosInstance = this.httpService.axiosRef;
  }

  /**
   * this module is used to sync data from the third party API to the database
   *
   */
  @Cron('30 * * * * *')
  async sync() {
    try {
      // Perform the sync operation
      const affiliates = await this.getAffiliates();
      if (affiliates.length === 0) {
        this.logger.warn('No active affiliates found');
        return;
      }

      // for (const affiliate of affiliates) {
      //   this.logger.log(`Syncing data for affiliate: ${affiliate.name}`);
      //   // Call the sync method for each affiliate
      //   await this.syncAffiliateData(affiliate);
      // }
      this.logger.log('Sync operation completed successfully');
    } catch (err) {
      this.logger.error('Error in sync method', err);
    }
  }

  /**
   *  Fetches all active affiliates from the database.
   * @returns {Promise<Affiliate[]>} - Returns a promise that resolves to an array of active affiliates
   */
  async getAffiliates(): Promise<Affiliate[]> {
    try {
      const affiliates = await this.AffiliateModel.find({
        isActive: true,
        environment: process.env.NODE_ENV,
      }).lean();

      if (!affiliates || affiliates.length === 0) {
        this.logger.warn('No active affiliates found');
        return [];
      }
      return affiliates;
    } catch (err) {
      this.logger.error('Error fetching affiliates', err);
      throw new Error('Error fetching affiliates');
    }
  }

  /**
   * Syncs data for a specific affiliate.
   */
  async syncAffiliateData(affiliate: Affiliate): Promise<void> {
    try {
      this.prepareDataForDatabase(mockPackages);

      // Convert the Observable to a Promise
      const response = await lastValueFrom(
        this.httpService.get(affiliate.baseUrl),
      );

      // Handle the response data
      const data = response.data;

      this.logger.log(
        `Data fetched for affiliate ${affiliate.name} on url ${affiliate.baseUrl}:`,
        data,
      );

      // Save the data to the database
      // await this.saveDataToDatabase(data);

      this.logger.log(
        `Data synced for affiliate: ${affiliate.name}  on url ${affiliate.baseUrl}:`,
      );
    } catch (err) {
      // Catch any errors, including HTTP errors
      delete affiliate.apiKey;
      delete affiliate.apiSecret;
      this.logger.error(
        `Error syncing data for affiliate ${JSON.stringify(affiliate)}: ${err.message}`,
      );
    }
  }

  prepareDataForDatabase(data): any {
    this.packageService.saveSyncData(data);
  }
}
