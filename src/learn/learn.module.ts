import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { LearnPrismaRepository } from "./repository/learnPrisma.respository";
import { SubjectModule } from "src/subject/subject.module";
import { LearnController } from "./learn.controller";
import { AddLearnUseCase } from "./usecase/addLearn.usecase";

@Module({
    imports: [
        PrismaModule,
        SubjectModule
    ],
    controllers: [
        LearnController
    ],
    providers: [
        {
            provide: "LearnRepository",
            useClass: LearnPrismaRepository
        },
        AddLearnUseCase
    ],
})
export class LearnModule {}