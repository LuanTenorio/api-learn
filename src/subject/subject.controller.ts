import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CreateSubjectUsecase } from "./usecase/createSubject.usecase";
import { ResponseSubjectDto } from "./dto/responseSubject.dto";
import { ExceptionDto } from "src/util/dto/exception.dto";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { UserId } from "src/auth/param/userId.param";
import { RenameSubjectDto } from "./dto/renameSubject.dto";
import { RenameSubjectUsecase } from "./usecase/renameSubject.usecase";
import { DeleteSubjectUsecase } from "./usecase/deleteSubject.usecase";
import { PaginationDto } from "src/pagination/dto/pagination.dto";
import { PaginationSubjectUseCase } from "./usecase/paginationSubject.usecase";

@Controller("subjects")
export class SubjectController {

    constructor(
        private readonly createSubjectUsecase: CreateSubjectUsecase,
        private readonly renameSubjectUsecase: RenameSubjectUsecase,
        private readonly deleteSubjectUsecase: DeleteSubjectUsecase,
        private readonly paginationSubjectUseCase: PaginationSubjectUseCase
    ) {}

    @ApiBody({ required: true, type: CreateSubjectDto })
    @ApiOkResponse({ type: ResponseSubjectDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiConflictResponse({ type: ExceptionDto })
    @Post()
    async createSubject(@UserId() userId: number, @Body() subjectDto: CreateSubjectDto) {
        subjectDto.userId = userId
        return this.createSubjectUsecase.execute(subjectDto)
    }

    @ApiBody({ required: true, type: RenameSubjectDto })
    @ApiOkResponse({ type: ResponseSubjectDto })
    @ApiBadRequestResponse({ type: ExceptionDto })
    @ApiNotFoundResponse({ type: ExceptionDto })
    @Patch(":id")
    async renameSubject(@UserId() userId: number, @Param("id") id: number, @Body() renameSubjectDto: RenameSubjectDto) {
        renameSubjectDto.id = id;
        return this.renameSubjectUsecase.execute(userId, renameSubjectDto);
    }

    @ApiNotFoundResponse({ type: ExceptionDto })
    @Delete(":id")
    async deleteSubject(@UserId() userId: number, @Param("id") id: number) {
        return this.deleteSubjectUsecase.execute(id);
    }

    @ApiOkResponse({ type: PaginationDto })
    @ApiBody({ required: true, type: PaginationDto })
    @Get()
    async pagination(@UserId() userId: number, @Query() pagination: PaginationDto<ResponseSubjectDto>) {
        await this.paginationSubjectUseCase.execute(userId, pagination)
        return pagination
    }
}