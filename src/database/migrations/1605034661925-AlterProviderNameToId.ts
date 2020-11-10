/* eslint-disable @typescript-eslint/no-empty-function */

import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderNameToId1605034661925
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TABLE FIRST PARAM, COLUMN SECOND PARAM
    await queryRunner.dropColumn('appointments', 'provider');
    // TABLE FIRST PARAM, Tablecolum, with name and type of new column
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    // FOREIGN KEY FIRST PARAM IS WHICH TABLE
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        // WHICH REFERENCE IN TABLE USERS
        referencedColumnNames: ['id'],
        // WHICH TABLE WE REFERENCE
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // MUST REDO IN REVERSE ORDER
    // drop foreginKey
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    // drop provider_id column
    await queryRunner.dropColumn('appointments', 'provider_id');

    // redo provider column
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
