import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUser1613334564043 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },

          {
            name: 'name',
            type: 'varchar'
          },

          { name: 'avatar', type: 'varchar', isNullable: true },

          {
            name: 'last_name',
            type: 'varchar'
          },

          {
            name: 'id_lol',
            type: 'int',
            isNullable: true
          },

          {
            name: 'id_valorant',
            type: 'int',
            isNullable: true
          },

          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },

          {
            name: 'password',
            type: 'varchar'
          },

          {
            name: 'phone',
            type: 'varchar'

          },

          {
            name: 'reputation',
            type: 'varchar'
          },

          {
            name: 'birth_date',
            type: 'timestamp'
          },

          {
            name: 'genre',
            type: 'varchar'
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
