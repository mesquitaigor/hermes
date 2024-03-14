import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { WorkspaceService } from '../workspace.service';
import { UserService } from '../../user/user.service';
import CreateWorkspaceDto from './dto/CreateDto';

@Controller('workspace')
export class WorkspaceController {
  constructor(
    private readonly service: WorkspaceService,
    private readonly userService: UserService,
  ) {}
  @Post()
  async createStatus(@Body(ValidationPipe) createDto: CreateWorkspaceDto) {
    const user = await this.userService.find(createDto.userId);
    return await this.service.create({
      name: createDto.name,
      user,
    });
  }
  @Get()
  async find(@Body('id') id: number) {
    return await this.service.find(id);
  }
}
