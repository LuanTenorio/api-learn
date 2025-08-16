import { Body, Controller, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { addLearnDto } from "./dto/addLearn.dto";
import { AddLearnUseCase } from "./usecase/addLearn.usecase";
import { UserId } from "src/auth/param/userId.param";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiForbiddenResponse, ApiOkResponse } from "@nestjs/swagger";
import { ExceptionDto } from "src/util/dto/exception.dto";
import { ResponseLearnDto } from "./dto/responseLearn.dto";
import { PaginationDto } from "src/pagination/dto/pagination.dto";
import { PaginationLearnUseCase } from "./usecase/paginationSubject.usecase";
import { Pagination } from "src/pagination/param/pagination";

@Controller("learns")
export class LearnController {

    constructor(
        private readonly createLearnUsecase: AddLearnUseCase,
        private readonly paginationLearnUseCase: PaginationLearnUseCase
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
    
    @ApiOkResponse({ type: PaginationDto })
    @ApiBody({ required: true, type: PaginationDto })
    @ApiForbiddenResponse({ type: ExceptionDto })
    @Get()
    async pagination(@UserId() userId: number, @Query('subjectId', ParseIntPipe) subjectId: number, @Pagination(["subjectId"]) pagination: PaginationDto<ResponseLearnDto>) {
        await this.paginationLearnUseCase.execute(userId, subjectId, pagination)

        return pagination;
    }

}