import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './space.entity';
import { Workspace } from '../workspace/workspace.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private repository: Repository<Space>,
  ) {}
  async create(name: string, workspaceId: number) {
    const workspace = new Workspace();
    workspace.id = workspaceId;
    const space = this.repository.create({ name, workspace: workspace });
    return await this.repository.save(space);
  }
}
