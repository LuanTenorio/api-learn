import { Body, Controller, Post } from "@nestjs/common";
import { addLearnDto } from "./dto/addLearn.dto";
import { AddLearnUseCase } from "./usecase/addLearn.usecase";
import { UserId } from "src/auth/param/userId.param";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiForbiddenResponse, ApiOkResponse } from "@nestjs/swagger";
import { ExceptionDto } from "src/util/dto/exception.dto";
import { ResponseLearnDto } from "./dto/responseLearn.dto";

@Controller("learns")
export class LearnController {

    constructor(
        private readonly createLearnUsecase: AddLearnUseCase
    ){}

    @ApiBody({ required: true, type: addLearnDto })
    @ApiForbiddenResponse({ type: ExceptionDto })
    @ApiOkResponse({ type: ResponseLearnDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiConflictResponse({ type: ExceptionDto })
    @Post()
    async addLearn(@UserId() userId: number, @Body() addLearnDto: addLearnDto) {
        return this.createLearnUsecase.execute(userId, addLearnDto)
    }

}