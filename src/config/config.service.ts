import { Injectable, Logger } from "@nestjs/common";
import { Config } from "./dto/config.dto";
import { readFileSync } from "fs";
import { load } from "js-yaml"
import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ConfigService {

   private readonly logger = new Logger(ConfigService.name)
   private _config: Config

   constructor() {
      this.load()
   }

   get config() {
      return this._config
   }

   private loadYml() {
      const fileContents = readFileSync("./config.yml", 'utf8')

      return load(fileContents) as Config
   }

   load() {
      let config: Config

      try {
         config = plainToInstance(Config, this.loadYml())
      } catch (error) {
         this.logger.error(error)
         process.exit(1)
      }

      this.validateString(config)

      process.env["DATABASE_URL"] = config.db.url
      process.env["PORT"] = config.server.port.toString()

      this._config = config
   }

   private validateString(config: Config) {
      const error = validateSync(config, {
         forbidNonWhitelisted: true,
         whitelist: true,
      })

      if (error.length) {
         this.logger.error(error)
         process.exit(1)
      }
   }
}