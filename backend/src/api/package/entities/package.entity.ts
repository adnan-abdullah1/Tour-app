import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageHighlightEntity } from './package_highlights.entity';

@Entity('package')
export class PackageEntity extends AbstractEntity {
  constructor(data?: Partial<any>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_package_id' })
  id!: Uuid;

  @Column()
  name!: string;

  // duration
  @Column({ type: 'int' })
  nights: number;
  @Column({ type: 'int' })
  days: number;

  @Column({ type: 'int', default: 0 })
  rating!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price!: number; // ex 100.10

  // Automatically set when the record is created
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  declare createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', default: null })
  deletedAt!: Date;

  // Highlights relationship
  @OneToMany(() => PackageHighlightEntity, (highlight) => highlight.package, {
    cascade: true,
  })
  highlights!: PackageHighlightEntity[]; // List of highlights for the package

  // Departures relationship
  @OneToMany(() => PackageHighlightEntity, (departure) => departure.package, {
    cascade: true,
  })
  departures!: PackageHighlightEntity[]; // List of departures for the package

  // Inclusions relationship
  @OneToMany(() => PackageHighlightEntity, (inclusion) => inclusion.package, {
    cascade: true,
  })
  inclusions!: PackageHighlightEntity[]; // List of departures for the package
  // exclusions relationship
  @OneToMany(() => PackageHighlightEntity, (exclusion) => exclusion.package, {
    cascade: true,
  })
  exclusions!: PackageHighlightEntity[]; // List of departures for the package

  @OneToMany(() => PackageHighlightEntity, (media) => media.package, {
    cascade: true,
  })
  media!: PackageHighlightEntity[]; // List of departures for the package
}
