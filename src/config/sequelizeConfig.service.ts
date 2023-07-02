import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";
import { EnumConfig } from "./enumConfig/enumConfig";
import { Todo } from "src/todos/models/todo.model";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/models/user.model";


@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createSequelizeOptions(): SequelizeModuleOptions {
        const {
            pg: { dialect, logging, host, port, username, password, database },
        } = this.configService.get(EnumConfig.DATABASE)

        return {
            dialect, logging, host, port, username, password,
            database,
            models: [Todo, User],
            autoLoadModels: true,
            synchronize: true,

        };
    }
}