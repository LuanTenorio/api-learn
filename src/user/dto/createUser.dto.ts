import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength } from "class-validator"


export class CreateUserDto {

    @ApiProperty({
        required: true,
        minimum: 3,
        maximum: 70
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 70)
    name: string

    @ApiProperty({
        required: true,
        minimum: 3,
        maximum: 70
    })
    @Length(3, 70)
    @IsEmail()
    email: string

    @ApiProperty({
        required: true,
        maximum: 8,
        maxLength: 140,
        example: "#Teste1234",
        description: "strong password with at least one lowercase and uppercase letter, number, symbol and 8 characters"
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