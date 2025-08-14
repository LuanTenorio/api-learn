import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword, Length, MaxLength } from "class-validator"

export class LoginDto {

    @ApiProperty({
        required: true,
        maximum: 3,
        maxLength: 70
    })
    @Length(3, 70)
    @IsEmail()
    email: string

    @ApiProperty({
        required: true,
        maximum: 8,
        maxLength: 140,
        example: "#Teste1234"
    })
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minLength: 8,
    })
    @MaxLength(140)
    password: string
}