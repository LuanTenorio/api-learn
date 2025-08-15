import { IsDate, IsEnum, IsNumber, IsString, Length } from "class-validator";
import { LearnType } from "generated/prisma";

export class addLearnDto {

    @IsString()
    @Length(3, 150)
    content: string;

    @IsString()
    @IsEnum(LearnType)
    type: LearnType;

    @IsNumber()
    subjectId: number;
}