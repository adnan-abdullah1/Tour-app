import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageEntity } from './package.entity'; // Import the PackageEntity

@Entity('package_highlights')
export class PackageHighlightEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_package_highlights_id',
  })
  id!: string; // Pk

  @Column({ type: 'text', nullable: false })
  description!: string;

  // relations
  @ManyToOne(() => PackageEntity, (Package) => Package.highlights, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'package_id' }) // Fk column
  package!: PackageEntity; // Reference to the PackageEntity
}
