import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateCardsSubcards1706129854177 implements MigrationInterface {
  private readonly tableName = 'card_subcards';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
        ],
      }),
      true,
    );

    await this.createCardRelation(queryRunner);
    await this.createSubCardRelation(queryRunner);
  }

  private async createCardRelation(queryRunner: QueryRunner) {
    const fkColumnName = 'card_id';
    const cardIdColumn = new TableColumn({
      name: fkColumnName,
      type: 'int',
      isNullable: false,
      unsigned: true,
    });
    await queryRunner.addColumn(this.tableName, cardIdColumn);
    const fkCard = new TableForeignKey({
      columnNames: [fkColumnName],
      referencedColumnNames: ['id'],
      referencedTableName: 'board_cards',
      onDelete: 'CASCADE',
      name: 'FK_subcardRelation_card',
    });
    await queryRunner.createForeignKey(this.tableName, fkCard);
  }
  private async createSubCardRelation(queryRunner: QueryRunner) {
    const fkColumnName = 'subcard_id';
    const subCardIdColumn = new TableColumn({
      name: fkColumnName,
      type: 'int',
      isNullable: false,
      unsigned: true,
    });
    await queryRunner.addColumn(this.tableName, subCardIdColumn);

    const fkSubCard = new TableForeignKey({
      columnNames: [fkColumnName],
      referencedColumnNames: ['id'],
      referencedTableName: 'board_cards',
      onDelete: 'CASCADE',
      name: 'FK_subcardRelation_subcard',
    });
    await queryRunner.createForeignKey(this.tableName, fkSubCard);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true, true, true);
  }
}
