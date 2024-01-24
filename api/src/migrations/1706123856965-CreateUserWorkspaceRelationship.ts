import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserWorkspaceRelationship1706123856965
  implements MigrationInterface
{
  private readonly tableName = 'user_workspace_ralationship';
  private readonly userReferenceCollumnName = 'userId';
  private readonly workspaceReferenceCollumnName = 'workspaceId';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: this.userReferenceCollumnName,
          type: 'int',
          isNullable: false,
          unsigned: true,
        },
        {
          name: this.workspaceReferenceCollumnName,
          type: 'int',
          isNullable: false,
          unsigned: true,
        },
      ],
    });
    queryRunner.createTable(table);

    const userForeingKey = new TableForeignKey({
      columnNames: [this.userReferenceCollumnName],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    });
    queryRunner.createForeignKey(this.tableName, userForeingKey);

    const workspaceForeingKey = new TableForeignKey({
      columnNames: [this.workspaceReferenceCollumnName],
      referencedColumnNames: ['id'],
      referencedTableName: 'workspaces',
      onDelete: 'CASCADE',
    });
    queryRunner.createForeignKey(this.tableName, workspaceForeingKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true, true, true);
  }
}
