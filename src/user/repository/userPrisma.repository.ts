import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.ropository";
import { CreateUserDto } from "../dto/createUser.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserResponseDto } from "../dto/userResponse.dto";

@Injectable()
export class UserPrismaRepository implements UserRepository {

    @Inject()
    private readonly prismaService: PrismaService

    createUser(userDto: CreateUserDto): Promise<UserResponseDto> {
        return this.prismaService.user.create({
            data: userDto,
            omit: { password: true }
        })
    }

    findUserWithPwd(email: string): Promise<UserResponseDto & { password: string } | null> {
        return this.prismaService.user.findFirst({
            where: { email }
        })
    }

}