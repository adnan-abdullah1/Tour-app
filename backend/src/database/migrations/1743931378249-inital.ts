import { MigrationInterface, QueryRunner } from "typeorm";

export class Inital1743931378249 implements MigrationInterface {
    name = 'Inital1743931378249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "description" character varying,
                "content" character varying,
                "user_id" uuid NOT NULL,
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_post_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "session" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "hash" character varying(255) NOT NULL,
                "user_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_session_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying(50),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "bio" character varying NOT NULL DEFAULT '',
                "image" character varying NOT NULL DEFAULT '',
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_username" ON "user" ("username")
            WHERE "deleted_at" IS NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_email" ON "user" ("email")
            WHERE "deleted_at" IS NULL
        `);
        await queryRunner.query(`
            CREATE TABLE "package_highlights" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "description" text NOT NULL,
                "package_id" uuid,
                CONSTRAINT "PK_package_highlights_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "package" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "nights" integer NOT NULL,
                "days" integer NOT NULL,
                "rating" integer NOT NULL DEFAULT '0',
                "price" numeric(10, 2) NOT NULL,
                "deleted_at" TIMESTAMP,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_package_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "package_inclusions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "package_id" uuid NOT NULL,
                "description" text NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_package_inclusions_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "package_exclusions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "description" text NOT NULL,
                "package_id" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_package_exclusions_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "package_departure" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "start_date" TIMESTAMP NOT NULL DEFAULT now(),
                "end_date" TIMESTAMP NOT NULL DEFAULT now(),
                "price" numeric NOT NULL,
                "package_id" uuid,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_package_departure_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_post_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_session_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "package_highlights"
            ADD CONSTRAINT "FK_3a5bd1be5a803e8f8fffcbfab0f" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "package_inclusions"
            ADD CONSTRAINT "FK_90940ac72d2f670186f5b46fba3" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "package_exclusions"
            ADD CONSTRAINT "FK_1b2504011c5756f2971ea18875f" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "package_departure"
            ADD CONSTRAINT "FK_686ddcd72eec825dde80ba66510" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "package_departure" DROP CONSTRAINT "FK_686ddcd72eec825dde80ba66510"
        `);
        await queryRunner.query(`
            ALTER TABLE "package_exclusions" DROP CONSTRAINT "FK_1b2504011c5756f2971ea18875f"
        `);
        await queryRunner.query(`
            ALTER TABLE "package_inclusions" DROP CONSTRAINT "FK_90940ac72d2f670186f5b46fba3"
        `);
        await queryRunner.query(`
            ALTER TABLE "package_highlights" DROP CONSTRAINT "FK_3a5bd1be5a803e8f8fffcbfab0f"
        `);
        await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_session_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_post_user_id"
        `);
        await queryRunner.query(`
            DROP TABLE "package_departure"
        `);
        await queryRunner.query(`
            DROP TABLE "package_exclusions"
        `);
        await queryRunner.query(`
            DROP TABLE "package_inclusions"
        `);
        await queryRunner.query(`
            DROP TABLE "package"
        `);
        await queryRunner.query(`
            DROP TABLE "package_highlights"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."UQ_user_email"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."UQ_user_username"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "session"
        `);
        await queryRunner.query(`
            DROP TABLE "post"
        `);
    }

}
