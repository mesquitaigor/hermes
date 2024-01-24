import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSpaceBoardIdToBoardStatus1706128762546
  implements MigrationInterface
{
  private readonly targetTableName = 'board_status';
  private readonly fkColumnName = 'spaceBoardId';

  private readonly referencedColumnName = 'space_boards';

  private readonly fkConstraintName = 'FK_boardstatus_spaceboards';
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
