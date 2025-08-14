import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import type { UserRepository } from "../repository/user.ropository";
import { LoginUsecase } from "src/auth/usecase/login.usecase";

@Injectable()
export class CreateUserUsecase {

    private logger = new Logger(LoginUsecase.name)

    @Inject("UserRepository")
    private readonly userRepo: UserRepository

    async execute(userDto: CreateUserDto) {
        try {
            const user = await this.userRepo.createUser(userDto)

            return user
        } catch (e) {
            if (e?.code == "P2002") {
                throw new ConflictException("User with this email already exists")
            }

            this.logger.error(e)
            throw new InternalServerErrorException()
        }
    }
}