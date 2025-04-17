import { AbstractEntity } from '@/database/entities/abstract.entity';
import { ObjectId } from 'mongodb';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
} from 'typeorm';

@Entity('property')
@Index('UQ_property', ['name'], { unique: true, where: '"deletedAt" IS NULL' })
export class PropertyEntity extends AbstractEntity {
  constructor(data?: Partial<PropertyEntity>) {
    super();
    Object.assign(this, data);
  }

  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  @Index()
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
  propertyClass: string;

  @Column({ type: 'json', nullable: true })
  media?: Array<{ type: 'video' | 'image'; url: string }>;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;
}
