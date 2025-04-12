import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncAndExcAsJson1744049602460 implements MigrationInterface {
  name = 'IncAndExcAsJson1744049602460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "inclusions"
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "inclusions" text
        `);
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "exclusions"
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "exclusions" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "exclusions"
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "exclusions" json
        `);
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "inclusions"
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "inclusions" json
        `);
  }
}
