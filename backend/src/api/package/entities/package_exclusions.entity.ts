import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageEntity } from './package.entity';

@Entity('package_exclusions')
export class PackageElusionsEntity extends AbstractEntity {
  constructor(data?: Partial<any>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_package_exclusions_id',
  })
  id!: Uuid;

  @Column({ type: 'text' })
  description!: string;

  @ManyToOne(() => PackageEntity, (Package) => Package.exclusions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' }) // Fk column
  package!: PackageEntity; // Reference to the PackageEntity
}
