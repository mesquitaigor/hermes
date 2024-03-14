import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtGuard } from '../../../auth/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('/:id/workspaces')
  async getWorkspaces(@Param('id') userId: number): Promise<any> {
    const workspaces = await this.userService.userWorkspaces(userId);
    return workspaces.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
    }));
  }
}
