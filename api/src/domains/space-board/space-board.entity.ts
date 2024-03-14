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
import { BoardStatus } from '../board-status/board-status.entity';
import { Space } from '../space/space.entity';

@Entity({ name: 'space_boards' })
export class SpaceBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => BoardStatus, (status) => status.board)
  statusList: BoardStatus[];

  @ManyToOne(() => Space, (space) => space.boards, { nullable: false })
  space: Space;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
