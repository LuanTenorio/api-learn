import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString, Length } from "class-validator";

export class RenameSubjectDto {

    @ApiProperty({
        required: true,
        minimum: 3,
        maximum: 150
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 150)
    name: string;

    @IsEmpty()
    id: number;
}
