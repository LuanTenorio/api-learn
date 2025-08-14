import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { CreateUserUsecase } from "./usecase/createUser.usecase";
import { PublicRouter } from "src/auth/metadata/public.metadata";
import { ApiOkResponse, ApiConflictResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { ExceptionDto } from "src/util/dto/exception.dto";
import { UserResponseDto } from "./dto/userResponse.dto";

@ApiTags("User")
@Controller("users")
export class UserController {

    constructor(
        private readonly createUserUsecase: CreateUserUsecase
    ) { }

    @ApiBody({ type: CreateUserDto, required: true })
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserResponseDto })
    @ApiInternalServerErrorResponse({ type: ExceptionDto })
    @ApiConflictResponse({ type: ExceptionDto, description: "There cannot be 2 users with the same email" })
    @PublicRouter()
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.createUserUsecase.execute(userDto)
    }

}