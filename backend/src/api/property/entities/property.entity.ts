import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('property')
export class PropertyEntity extends AbstractEntity {
  constructor(data?: Partial<PropertyEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_property_id',
  })
  id!: Uuid;

  @Column()
  @Index('UQ_property', { where: '"deleted_at" IS NULL', unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  address!: string;

  @Column({
    name: 'property_class',
    type: 'varchar',
    length: 50,
    default: '1-star',
  })
  propertyClass: string; // e.g., "4-star", "5-star"

  @Column({ type: 'json', nullable: true })
  media?: Array<{ type: 'video' | 'image'; url: string }>;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;
}
