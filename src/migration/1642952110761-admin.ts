import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcryptjs'
import UserEntity from "../entities/user.entity";

export class admin1642952110761 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const pwd = bcrypt.hashSync("admin");
        await queryRunner.manager.createQueryBuilder().insert().into(UserEntity).values({name: "admin", login: "admin", password: pwd}).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().delete().from(UserEntity).where("login = :login", { login: "admin" }).execute();
    }

}
