import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({
        required: true,
        description: "Bearer jwt token"
    })
    access_token: string
}