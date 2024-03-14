import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import UserDto from './controller/dto/UserDto';
import * as bcrypt from 'bcrypt';
import { Workspace } from '../workspace/workspace.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    const saltOrRounds = 12;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hash;
    return await this.userRepository.save(user);
  }
  async find(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
  async userWorkspaces(userId: number): Promise<Workspace[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['workspaces'],
    });
    console.log(userId, user);
    return user.workspaces;
  }
}
