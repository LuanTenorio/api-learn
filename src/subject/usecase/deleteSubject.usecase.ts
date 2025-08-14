import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import type { SubjectRepository } from "../repository/subject.repository";

@Injectable()
export class DeleteSubjectUsecase {

    @Inject("SubjectRepository")
    private readonly subjectRepo: SubjectRepository;

    async execute(id: number): Promise<void> {
        try {
            await this.subjectRepo.deleteSubject(id);
        } catch (e) {
            if (e?.code === "P2025") {
                throw new NotFoundException('Subject not found');
            }

            throw new InternalServerErrorException();
        }
    }

}