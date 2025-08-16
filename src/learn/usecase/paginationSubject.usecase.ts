import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/pagination/dto/pagination.dto";
import type { LearnRepository } from "../repository/learn.repository";
import { ResponseLearnDto } from "../dto/responseLearn.dto";
import { ValidateSubjectOwnershipUseCase } from "src/subject/usecase/validateSubjectOwnership.usecase";

@Injectable()
export class PaginationLearnUseCase {

    @Inject("LearnRepository")
    private readonly learnRepo: LearnRepository;

    @Inject()
        private readonly validateSubjectOwnership: ValidateSubjectOwnershipUseCase;

    async execute(userId: number, subjectId: number, pagination: PaginationDto<ResponseLearnDto>) {
        pagination.where = {
            ...pagination.where,
            subjectId
        }
        
        let valid = await this.validateSubjectOwnership.execute(userId, subjectId)

        if (!valid) throw new ForbiddenException('You do not own this subject')

        return this.learnRepo.pagination(pagination)
    }
}