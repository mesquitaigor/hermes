import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSpaceFolderIdToSpaceBoard1706128629061
  implements MigrationInterface
{
  private readonly targetTableName = 'space_boards';
  private readonly fkColumnName = 'spaceFolderId';

  private readonly referencedColumnName = 'space_folders';

  private readonly fkConstraintName = 'FK_spaceboards_spacefolders';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const fkReferenceColumn = new TableColumn({
      name: this.fkColumnName,
      type: 'int',
      isNullable: false,
      unsigned: true,
    });
    await queryRunner.addColumn(this.targetTableName, fkReferenceColumn);

    const referenceForeingKey = new TableForeignKey({
      columnNames: [this.fkColumnName],
      referencedColumnNames: ['id'],
      referencedTableName: this.referencedColumnName,
      onDelete: 'CASCADE',
      name: this.fkConstraintName,
    });
    await queryRunner.createForeignKey(
      this.targetTableName,
      referenceForeingKey,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.targetTableName);
    const foreingKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(this.fkColumnName) !== -1,
    );
    await queryRunner.dropForeignKey(this.targetTableName, foreingKey);
    await queryRunner.dropColumn(this.targetTableName, this.fkColumnName);
  }
}
