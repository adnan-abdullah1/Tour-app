import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnMedia1744304658948 implements MigrationInterface {
  name = 'AddNewColumnMedia1744304658948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package"
            ADD "media" json
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "media"
        `);
  }
}
