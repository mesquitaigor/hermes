import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpaceBoard } from '../space-board/space-board.entity';
import { Workspace } from '../workspace/workspace.entity';

@Entity({ name: 'spaces' })
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => SpaceBoard, (status) => status.space)
  boards: SpaceBoard[];

  @ManyToOne(() => Workspace, (workspace) => workspace.spaces, {
    nullable: false,
  })
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
