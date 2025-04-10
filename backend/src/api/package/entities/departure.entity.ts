import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageEntity } from './package.entity';

@Entity('package_departure')
export class DepartureEntity extends AbstractEntity {
  constructor(data?: Partial<any>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_package_departure_id',
  })
  id!: Uuid;

  @CreateDateColumn({
    name: 'start_date',
    type: 'timestamp',
    nullable: false,
  })
  startDate!: Date;

  @CreateDateColumn({
    name: 'end_date',
    type: 'timestamp',
    nullable: false,
  })
  endDate!: Date;

  @Column({ type: 'numeric' })
  price!: number;

  @ManyToOne('PackageEntity', 'departure', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' })
  package!: PackageEntity;
}
