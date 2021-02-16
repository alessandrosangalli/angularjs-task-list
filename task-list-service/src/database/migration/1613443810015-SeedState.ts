import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { StateSeed } from '../seed/state.seed';

export class SeedState1613443128301 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const stateSeed = StateSeed;
        await getRepository('state').save(stateSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }
}
