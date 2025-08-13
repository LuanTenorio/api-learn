import { Type } from "class-transformer"
import { ValidateNested } from "class-validator"
import { DBConfig } from "./dbConfig.dto"
import { ServerConfig } from "./serverConfig.dto"
import { LogConfig } from "./logConfig.dto"

export class Config {
    @ValidateNested()
    @Type(() => DBConfig)
    db: DBConfig

    @ValidateNested()
    @Type(() => ServerConfig)
    server: ServerConfig

    @ValidateNested()
    @Type(() => LogConfig)
    log: LogConfig
}