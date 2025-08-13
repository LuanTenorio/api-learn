import { IsString, IsNotEmpty } from "class-validator";

export class DBConfig {
    @IsString()
    @IsNotEmpty()
    url: string
}