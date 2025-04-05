import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFirstNameAndLastName1743843967916 implements MigrationInterface {
    name = 'AddFirstNameAndLastName1743843967916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."UQ_user_username"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firstName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "lastName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "user_name" character varying(50)
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "first_name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "last_name" character varying NOT NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_username" ON "user" ("user_name")
            WHERE "deleted_at" IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."UQ_user_username"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "last_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "first_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "user_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "lastName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firstName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "username" character varying(50)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_username" ON "user" ("username")
            WHERE (deleted_at IS NULL)
        `);
    }

}
