import { MigrationInterface, QueryRunner } from "typeorm";

export class LocationAndRedirectUrl1744565226158 implements MigrationInterface {
    name = 'LocationAndRedirectUrl1744565226158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package"
            ADD "location" character varying(255) DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "package"
            ADD "redirectUrl" text DEFAULT ''
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "redirectUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "location"
        `);
    }

}
