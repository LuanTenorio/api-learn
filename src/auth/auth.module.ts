import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { LoginUsecase } from "./usecase/login.usecase";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5d' }
        }),
    ],
    controllers: [AuthController],
    providers: [
        LoginUsecase
    ]
})
export class AuthModule { }