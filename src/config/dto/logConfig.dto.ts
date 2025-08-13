import { IsBoolean } from "class-validator";

export class LogConfig {
    @IsBoolean()
    showQuery: boolean
}