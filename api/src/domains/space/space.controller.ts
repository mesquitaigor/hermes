import { Body, Controller, Post } from '@nestjs/common';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private readonly service: SpaceService) {}
  @Post()
  createStatus(
    @Body('name') name: string,
    @Body('workspaceId') workspaceId: number,
  ) {
    return this.service.create(name, workspaceId);
  }
}
