import { ForbiddenException, Inject } from "@nestjs/common";
import type { SubjectRepository } from "../repository/subject.repository";

export class ValidateSubjectOwnershipUseCase {

    @Inject("SubjectRepository")
    private readonly subjectRepo: SubjectRepository;

    async execute(userId: number, subjectId: number): Promise<boolean> {
        const userIdBySubject = await this.subjectRepo.getUserIdBySubjectId(subjectId)

        if (!userIdBySubject || userIdBySubject !== userId) 
            throw new ForbiddenException('You do not own this subject')
        
        return true
    }

} 