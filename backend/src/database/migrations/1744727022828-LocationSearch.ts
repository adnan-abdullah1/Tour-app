import { MigrationInterface, QueryRunner } from 'typeorm';

export class LocationSearch1744727022828 implements MigrationInterface {
  name = 'LocationSearch1744727022828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "package"
      ADD "package_search" tsvector
    `);

    await queryRunner.query(`
      ALTER TABLE "package"
      ADD "location_search" tsvector
    `);

    // Add GIN indexes
    await queryRunner.query(`
      CREATE INDEX idx_package_search ON package USING GIN(package_search)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_location_search ON package USING GIN(location_search)
    `);

    // Add trigger function
    await queryRunner.query(`
      CREATE FUNCTION package_search_trigger() RETURNS trigger AS $$
      BEGIN
        NEW.package_search := to_tsvector('english', coalesce(NEW.name, '') || ' ' || coalesce(NEW.description, ''));
        NEW.location_search := to_tsvector('english', coalesce(NEW.location, ''));
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql;
    `);

    // Attach the trigger to the "package" table
    await queryRunner.query(`
      CREATE TRIGGER tsvectorupdate_package BEFORE INSERT OR UPDATE
      ON package FOR EACH ROW EXECUTE PROCEDURE package_search_trigger();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS tsvectorupdate_package ON package`,
    );
    await queryRunner.query(`DROP FUNCTION IF EXISTS package_search_trigger`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_location_search`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_package_search`);
    await queryRunner.query(
      `ALTER TABLE "package" DROP COLUMN "location_search"`,
    );
    await queryRunner.query(
      `ALTER TABLE "package" DROP COLUMN "package_search"`,
    );
  }
}
