import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstNameAndLastName1743843510471
  implements MigrationInterface
{
  name = 'AddFirstNameAndLastName1743843510471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firstName" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "lastName" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "lastName"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firstName"
        `);
  }
}
