import { ApiProperty } from "@nestjs/swagger"

export class ExceptionDto {
    @ApiProperty({
        required: true
    })
    message: string

    @ApiProperty({
        required: true
    })
    error: string

    @ApiProperty({
        required: true
    })
    statusCode: number
}