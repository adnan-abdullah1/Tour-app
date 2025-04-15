import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('package')
export class PackageEntity extends AbstractEntity {
  constructor(data?: Partial<PackageEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_package_id' })
  id!: Uuid;

  @Column()
  name!: string;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true })
  location!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true, default: '' })
  redirectUrl!: string;

  @Column({ type: 'int', default: 0, nullable: true })
  rating!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'text', nullable: true })
  inclusions!: string;

  @Column({ type: 'text', nullable: true })
  exclusions!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  declare createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', default: null })
  deletedAt!: Date;

  @Column({ type: 'json', nullable: true })
  daysPlan: Array<{ day: number; plan: string; description: string }>; // eg., { day: 1, plan: 'Day 1 Plan' },...]

  @Column({ type: 'json', nullable: true })
  media?: Array<{ url: string; path: string }>;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'archived'],
    default: 'inactive',
  })
  status!: 'active' | 'inactive' | 'archived';

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
  })
  startDate!: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
  })
  endDate!: Date;

  @Column({ type: 'json', nullable: true })
  highlights!: Array<{ icon: string; description: string }>;

  @Column({
    type: 'tsvector',
    name: 'package_search',
    nullable: true,
    select: false,
  })
  PackageSearch!: string;

  @Column({
    type: 'tsvector',
    name: 'location_search',
    nullable: true,
    select: false,
  })
  LocationSearch!: string;
}
