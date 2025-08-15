import { Inject } from "@nestjs/common";
import { CreateSubjectDto } from "../dto/createSubject.dto";
import { ResponseSubjectDto } from "../dto/responseSubject.dto";
import { SubjectRepository } from "./subject.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { RenameSubjectDto } from "../dto/renameSubject.dto";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

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

    async renameSubject(userId: number, { id, name}: RenameSubjectDto): Promise<ResponseSubjectDto> {
        const subject = await this.prismaService.subject.update({
            where: { id, userId },
            data: { name }
        })
        
        return subject
    }

    async deleteSubject(userId: number, id: number): Promise<void> {
        await this.prismaService.subject.delete({
            where: { id, userId }
        })
    }

    async pagination(userId: number, pagination: PaginationDto<ResponseSubjectDto>) {
        const skip = (pagination.page - 1) * pagination.limit

        const [subjects, total] = await this.prismaService.$transaction([
            this.prismaService.subject.findMany({
                where: {
                    userId,
                    name: {
                        contains: pagination.where?.name,
                        mode: "insensitive"
                    }
                },
                omit: {
                    userId: true
                },
                skip,
                take: pagination.limit,
            }),
            this.prismaService.subject.count({
                where: {
                    userId,
                    name: {
                        contains: pagination.where?.name,
                        mode: "insensitive"
                    }
                }
            })
        ])

        pagination.data = subjects
        pagination.total = total
    }

    async getUserIdBySubjectId(subjectId: number) {
        const subject = await this.prismaService.subject.findUnique({
            where: { id: subjectId },
            select: { userId: true }
        })

        return subject?.userId;
    }

}