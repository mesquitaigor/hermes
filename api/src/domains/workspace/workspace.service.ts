import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from '../user/user.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private repository: Repository<Workspace>,
  ) {}
  async create(newWorkspace: { name: string; user: User }): Promise<Workspace> {
    const workspace = this.repository.create({ name: newWorkspace.name });
    workspace.users = [newWorkspace.user];
    return await this.repository.save(workspace);
  }
  async find(workspaceId: number): Promise<Workspace> {
    return await this.repository.findOne({
      where: { id: workspaceId },
      relations: ['spaces'],
    });
  }
}
