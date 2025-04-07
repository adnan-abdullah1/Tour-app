import { MigrationInterface, QueryRunner } from "typeorm";

export class Initalx1744041563857 implements MigrationInterface {
    name = 'Initalx1744041563857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package"
            ALTER COLUMN "price"
            SET DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package"
            ALTER COLUMN "price" DROP DEFAULT
        `);
    }

}
