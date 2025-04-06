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

@Entity('package_inclusions')
export class PackageInclusionsEntity extends AbstractEntity {
  constructor(data?: Partial<any>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_package_inclusions_id',
  })
  id!: Uuid;

  @Column({ type: 'uuid', nullable: false })
  package_id!: Uuid;

  @Column({ type: 'text' })
  description!: string;

  @ManyToOne(() => PackageEntity, (Package) => Package.inclusions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' }) // Fk column
  package!: PackageEntity; // Reference to the PackageEntity
}
