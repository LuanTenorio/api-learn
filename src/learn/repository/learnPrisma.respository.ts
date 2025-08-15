import { PrismaService } from "src/prisma/prisma.service";
import { addLearnDto } from "../dto/addLearn.dto";
import { ResponseLearnDto } from "../dto/responseLearn.dto";
import { LearnRepository } from "./learn.repository";
import { Inject } from "@nestjs/common";

export class LearnPrismaRepository implements LearnRepository {

    @Inject()
    private readonly prismaService: PrismaService

    async addLearn(learnDto: addLearnDto): Promise<ResponseLearnDto> {
        return this.prismaService.learn.create({
            data: {
                content: learnDto.content,
                type: learnDto.type,
                subjectId: learnDto.subjectId,
            }
        })
    }

    async checkLearnExistsByNameAndSubjectId(content: string, subjectId: number): Promise<boolean> {
        const learn = await this.prismaService.learn.count({
            where: {
                content,
                subjectId
            }
        })

        return learn !== 0
    }

}
