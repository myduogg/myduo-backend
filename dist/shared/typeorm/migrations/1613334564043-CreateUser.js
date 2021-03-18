"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1613334564043 = void 0;
const typeorm_1 = require("typeorm");
class CreateUser1613334564043 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUser1613334564043 = CreateUser1613334564043;
