import { Body, Controller, Delete, Param, Patch, Post, Req } from "@nestjs/common";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CreateSubjectUsecase } from "./usecase/createSubject.usecase";
import { ResponseSubjectDto } from "./dto/responseSubject.dto";
import { ExceptionDto } from "src/util/dto/exception.dto";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { UserId } from "src/auth/param/userId.param";
import { RenameSubjectDto } from "./dto/renameSubject.dto";
import { RenameSubjectUsecase } from "./usecase/renameSubject.usecase";
import { DeleteSubjectUsecase } from "./usecase/deleteSubject.usecase";

@Controller("subjects")
export class SubjectController {

    constructor(
        private readonly createSubjectUsecase: CreateSubjectUsecase,
        private readonly renameSubjectUsecase: RenameSubjectUsecase,
        private readonly deleteSubjectUsecase: DeleteSubjectUsecase
    ) {}

    @ApiBody({ required: true, type: CreateSubjectDto })
    @ApiOkResponse({ type: ResponseSubjectDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiConflictResponse({ type: ExceptionDto })
    @Post()
    async createSubject(@Body() subjectDto: CreateSubjectDto, @UserId() userId: number) {
        subjectDto.userId = userId
        return this.createSubjectUsecase.execute(subjectDto)
    }

    @ApiBody({ required: true, type: RenameSubjectDto })
    @ApiOkResponse({ type: ResponseSubjectDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiNotFoundResponse({ type: ExceptionDto })
    @Patch(":id")
    async renameSubject(@Param("id") id: number, @Body() renameSubjectDto: RenameSubjectDto) {
        renameSubjectDto.id = id;
        return this.renameSubjectUsecase.execute(renameSubjectDto);
    }

    @ApiNotFoundResponse({ type: ExceptionDto })
    @Delete(":id")
    async deleteSubject(@Param("id") id: number) {
        return this.deleteSubjectUsecase.execute(id);
    }
}