import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWorkspaceRelationship } from './user-worspace-relationship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWorkspaceRelationship])],
})
export class UserWorkspaceRelationshipModule {}
