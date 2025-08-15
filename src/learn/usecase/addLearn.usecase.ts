import { ConflictException, ForbiddenException, Inject } from "@nestjs/common";
import type { LearnRepository } from "../repository/learn.repository";
import { addLearnDto } from "../dto/addLearn.dto";
import { ResponseLearnDto } from "../dto/responseLearn.dto";
import { ValidateSubjectOwnershipUseCase } from "src/subject/usecase/validateSubjectOwnership.usecase";

export class AddLearnUseCase {
    
    
    @Inject("LearnRepository")
    private readonly learnRepository: LearnRepository

    @Inject()
    private readonly validateSubjectOwnership: ValidateSubjectOwnershipUseCase;

    async execute(userId: number, learnDto: addLearnDto): Promise<ResponseLearnDto> {
        let valid = await this.validateSubjectOwnership.execute(userId, learnDto.subjectId)

        if (!valid) throw new ForbiddenException('You do not own this subject')

        valid = await this.learnRepository.checkLearnExistsByNameAndSubjectId(learnDto.content, learnDto.subjectId)

        if (valid) throw new ConflictException('You already have a learn with this content')

        return this.learnRepository.addLearn(learnDto);
    }
}
