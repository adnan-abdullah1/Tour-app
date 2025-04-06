import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageEntity } from './package.entity'; // Import the PackageEntity

@Entity('package_media')
export class PackageMediaEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_package_media_id',
  })
  id!: string; // Primary key

  @Column({ type: 'text', nullable: false })
  type!: string;

  @Column({ type: 'text', nullable: false })
  url!: string;

  @Column({ type: 'text', nullable: true })
  description?: string; // Optional description of the media file

  @ManyToOne(() => PackageEntity, (Package) => Package.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' }) // Fk
  package!: PackageEntity; // Reference to the PackageEntity
}
