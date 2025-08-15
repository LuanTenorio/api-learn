import { Inject, Injectable } from "@nestjs/common";
import type { SubjectRepository } from "../repository/subject.repository";
import { ResponseSubjectDto } from "../dto/responseSubject.dto";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

@Injectable()
export class PaginationSubjectUseCase {

    @Inject("SubjectRepository")
    private readonly subjectRepo: SubjectRepository;

    async execute(userId: number, pagination: PaginationDto<ResponseSubjectDto>) {
        return this.subjectRepo.pagination(userId, pagination);
    }
}