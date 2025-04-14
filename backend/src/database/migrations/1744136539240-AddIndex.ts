import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndex1744136539240 implements MigrationInterface {
  name = 'AddIndex1744136539240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "property"
            ADD "deleted_at" TIMESTAMP
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_property" ON "property" ("name")
            WHERE "deleted_at" IS NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."UQ_property"
        `);
    await queryRunner.query(`
            ALTER TABLE "property" DROP COLUMN "deleted_at"
        `);
  }
}
