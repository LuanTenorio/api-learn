import { IsNumber } from "class-validator";

export class ServerConfig {
    @IsNumber()
    port: number
}