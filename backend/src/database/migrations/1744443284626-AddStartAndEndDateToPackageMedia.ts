import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartAndEndDateToPackageMedia1744443284626
  implements MigrationInterface
{
  name = 'AddStartAndEndDateToPackageMedia1744443284626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "start_date" date
        `);
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "end_date" date
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "end_date"
        `);
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "start_date"
        `);
  }
}
