import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblProperty1744135006222 implements MigrationInterface {
    name = 'AddTblProperty1744135006222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "property" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" text,
                "address" character varying NOT NULL,
                "property_class" character varying(50) NOT NULL DEFAULT '1-star',
                "media" json,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_property_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "package"
            ADD "daysPlan" json
        `);
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
        await queryRunner.query(`
            ALTER TABLE "package" DROP COLUMN "daysPlan"
        `);
        await queryRunner.query(`
            DROP TABLE "property"
        `);
    }

}
