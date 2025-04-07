import { MigrationInterface, QueryRunner } from "typeorm";

export class HighlightsColPackage1744042797830 implements MigrationInterface {
    name = 'HighlightsColPackage1744042797830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package"
            ADD "highlights" text
        `);
        await queryRunner.query(`
            ALTER TABLE "package"
            ALTER COLUMN "inclusions" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "package"
            ALTER COLUMN "exclusions" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package"
            ALTER COLUMN "exclusions"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "package"
            ALTER COLUMN "inclusions"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "highlights"
        `);
    }

}
