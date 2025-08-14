import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import type { SubjectRepository } from "../repository/subject.repository";
import { ResponseSubjectDto } from "../dto/responseSubject.dto";
import { RenameSubjectDto } from "../dto/renameSubject.dto";

@Injectable()
export class RenameSubjectUsecase {

    @Inject("SubjectRepository")
    private readonly subjectRepo: SubjectRepository;

    async execute(renameSubject: RenameSubjectDto): Promise<ResponseSubjectDto> {
        try{
            const subject = await this.subjectRepo.renameSubject(renameSubject)
            return subject
        }catch(e){
            if(e?.code == "P2025")
                throw new NotFoundException('Subject not found');

            throw new InternalServerErrorException();
        }
    }
}