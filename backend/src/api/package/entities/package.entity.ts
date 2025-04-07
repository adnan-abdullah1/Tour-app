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
import { DepartureEntity } from './departure.entity';
import { MediaEntity } from './media.entity';

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

  @Column({ type: 'int', default: 0, nullable: true })
  rating!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: 'text', nullable: true })
  inclusions!: string;

  @Column({ type: 'text', nullable: true })
  exclusions!: string;

  @Column({ type: 'text', nullable: true })
  highlights!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  declare createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', default: null })
  deletedAt!: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'archived'],
    default: 'inactive',
  })
  status!: 'active' | 'inactive' | 'archived';

  // Departures relationship
  @OneToMany('DepartureEntity', 'package', {
    cascade: true,
  })
  departure!: DepartureEntity[];

  // Media relationship
  @OneToMany('MediaEntity', 'media', {
    cascade: true,
  })
  media!: MediaEntity[];
}
