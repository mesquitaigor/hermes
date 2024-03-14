import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Workspace } from '../workspace/workspace.entity';

@Entity({ name: 'user_workspace_ralationship' })
export class UserWorkspaceRelationship {
  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @PrimaryColumn({ name: 'workspaceId' })
  workspaceId: number;

  @ManyToOne(() => User, (user) => user.workspaces, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Workspace, (workspace) => workspace.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'course_id', referencedColumnName: 'id' }])
  workspaces: Workspace[];
}
