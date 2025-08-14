import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import type { SubjectRepository } from "../repository/subject.repository";
import { CreateSubjectDto } from "../dto/createSubject.dto";

@Injectable()
export class CreateSubjectUsecase {

    private logger = new Logger(CreateSubjectUsecase.name)

    @Inject("SubjectRepository")
    private readonly subjectRepo: SubjectRepository

    async execute(subjectDto: CreateSubjectDto) {
        const subjectExists = await this.subjectRepo.checkSubjectExistsByNameAndUserId(subjectDto.name, subjectDto.userId)

        if (subjectExists) {
            this.logger.warn(`Subject with name ${subjectDto.name} already exists for user ${subjectDto.userId}`)
            throw new ConflictException("Subject with this name already exists for this user")
        }

        return this.subjectRepo.createSubject(subjectDto)
    }
}