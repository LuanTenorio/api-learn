import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateSubjectDto {

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
    userId: number;
}
