import { MigrationInterface, QueryRunner } from "typeorm";

export class PackageMedia1743931686694 implements MigrationInterface {
    name = 'PackageMedia1743931686694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "package_media" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" text NOT NULL,
                "url" text NOT NULL,
                "description" text,
                "package_id" uuid,
                CONSTRAINT "PK_package_media_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "package_media"
            ADD CONSTRAINT "FK_a608cbbc961d1af22808fc00cb0" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package_media" DROP CONSTRAINT "FK_a608cbbc961d1af22808fc00cb0"
        `);
        await queryRunner.query(`
            DROP TABLE "package_media"
        `);
    }

}
