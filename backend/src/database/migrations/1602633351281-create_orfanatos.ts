import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrfanatos1602633351281 implements MigrationInterface {
    // criar a tabela: yarn typeorm migration:run
    // dropar a tabela: yarn typeorm migration:revert
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orfanatos',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'abertura_horas',
                    type: 'varchar'
                },
                {
                    name: 'aberto_no_fimdesemana',
                    type: 'boolean',
                    default: false,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orfanatos')
    }

}
