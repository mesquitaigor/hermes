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
import { BoardCard } from '../board-card/board-card.entity';
import { SpaceBoard } from '../space-board/space-board.entity';

@Entity({ name: 'board_status' })
export class BoardStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => BoardCard, (task) => task.status)
  cards: BoardCard[];

  @ManyToOne(() => SpaceBoard, (board) => board.statusList, { nullable: false })
  board: SpaceBoard;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
