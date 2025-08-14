import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import type { UserRepository } from "src/user/repository/user.ropository";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { UserResponseDto } from "src/user/dto/userResponse.dto";
import { JwtPayloadDto } from "../dto/jwtPayload.dto";

@Injectable()
export class LoginUsecase {

    @Inject("UserRepository")
    private readonly userRepo: UserRepository

    @Inject()
    private jwtService: JwtService

    async execute(loginDto: LoginDto) {
        const user = await this.userRepo.findUserWithPwd(loginDto.email)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        if (!await this.checkPassword(loginDto.password, user.password)) {
            throw new UnauthorizedException("Wrong password")
        }

        const { password, ...responseUser } = user

        return this.createJWdPayload(responseUser)
    }

    private async checkPassword(loginPwd: string, userPwd: string): Promise<boolean> {
        return bcrypt.compare(loginPwd, userPwd)
    }

    private async createJWdPayload({ id: sub, name, email }: UserResponseDto) {
        const payload: JwtPayloadDto = { sub, email, name }

        return this.jwtService.signAsync(payload)
    }

}