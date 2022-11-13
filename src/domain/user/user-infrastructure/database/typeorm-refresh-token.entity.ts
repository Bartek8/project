import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { schema } from './config/typeorm.config';
import { TypeormUserEntity } from './typeorm-user.entity';

@Entity({ name: 'refresh_token_entity', schema })
export class TypeormRefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeormUserEntity, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: TypeormUserEntity;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @Column()
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
