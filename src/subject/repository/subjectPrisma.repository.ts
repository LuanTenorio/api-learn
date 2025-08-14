import { Inject } from "@nestjs/common";
import { CreateSubjectDto } from "../dto/createSubject.dto";
import { ResponseSubjectDto } from "../dto/responseSubject.dto";
import { SubjectRepository } from "./subject.repository";
import { PrismaService } from "src/prisma/prisma.service";

export class SubjectPrismaRepository implements SubjectRepository {

    @Inject()
    private readonly prismaService: PrismaService

    async createSubject(subjectDto: CreateSubjectDto): Promise<ResponseSubjectDto> {
        const subject = await this.prismaService.subject.create({ data: {
            ...subjectDto,
            avarage: 0,
            totalTime: 0,
        } })

        return subject
    }

    async checkSubjectExistsByNameAndUserId(name: string, userId: number): Promise<boolean> {
        const subject = await this.prismaService.subject.findFirst({
            where: {
                name,
                userId
            }
        })
        
        return !!subject;
    }

}