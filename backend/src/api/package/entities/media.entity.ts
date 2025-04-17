import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('package_media')
export class MediaEntity extends AbstractEntity {
  constructor(data?: Partial<any>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_package_media_id',
  })
  id!: string; // Primary key

  @Column({ type: 'text', nullable: false })
  type!: string;

  @Column({ type: 'text', nullable: false })
  url!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
