import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserPrismaRepository } from "./repository/userPrisma.repository";
import { CreateUserUsecase } from "./usecase/createUser.usecase";

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserPrismaRepository,
        CreateUserUsecase,
        {
            provide: "UserRepository",
            useClass: UserPrismaRepository
        }
    ],
    exports: [
        {
            provide: "UserRepository",
            useClass: UserPrismaRepository
        }
    ]
})
export class UserModule { }