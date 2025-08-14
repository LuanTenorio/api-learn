import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginUsecase } from "./usecase/login.usecase";
import { PublicRouter } from "./metadata/public.metadata";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/loginResponse.dto";
import { ExceptionDto } from "src/util/dto/exception.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {

    constructor(
        private readonly loginUsecase: LoginUsecase
    ) { }

    @ApiBody({ required: true, type: LoginDto })
    @ApiOkResponse({ type: LoginResponseDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiConflictResponse({ type: ExceptionDto })
    @PublicRouter()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const access_token = await this.loginUsecase.execute(loginDto)

        return { access_token }
    }

}