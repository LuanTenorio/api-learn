export class JwtPayloadDto {
    sub: number
    email: string
    name: string
    iat?: number
    exp?: number
}