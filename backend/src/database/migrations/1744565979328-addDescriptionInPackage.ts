import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionInPackage1744565979328
  implements MigrationInterface
{
  name = 'AddDescriptionInPackage1744565979328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "description" text
        `);
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "highlights"
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "highlights" json
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "highlights"
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "highlights" text
        `);
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "description"
        `);
  }
}
