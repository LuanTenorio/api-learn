import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CreateSubjectUsecase } from "./usecase/createSubject.usecase";
import { ResponseSubjectDto } from "./dto/responseSubject.dto";
import { ExceptionDto } from "src/util/dto/exception.dto";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";
import { UserId } from "src/auth/param/userId.param";

@Controller("subjects")
export class SubjectController {

    constructor(private readonly createSubjectUsecase: CreateSubjectUsecase) {}

    @ApiBody({ required: true, type: CreateSubjectDto })
    @ApiOkResponse({ type: ResponseSubjectDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiConflictResponse({ type: ExceptionDto })
    @Post()
    async createSubject(@Body() subjectDto: CreateSubjectDto, @UserId() userId: number) {
        subjectDto.userId = userId
        return this.createSubjectUsecase.execute(subjectDto)
    }
}