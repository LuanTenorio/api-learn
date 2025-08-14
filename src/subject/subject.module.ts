import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SubjectPrismaRepository } from "./repository/subjectPrisma.repository";
import { SubjectController } from "./subject.controller";
import { CreateSubjectUsecase } from "./usecase/createSubject.usecase";
import { RenameSubjectUsecase } from "./usecase/renameSubject.usecase";
import { DeleteSubjectUsecase } from "./usecase/deleteSubject.usecase";

@Module({
    imports: [PrismaModule],
    controllers: [SubjectController],
    providers: [
        {
            provide: "SubjectRepository",
            useClass: SubjectPrismaRepository
        },
        CreateSubjectUsecase,
        RenameSubjectUsecase,
        DeleteSubjectUsecase
    ],
    exports: []
})
export class SubjectModule {

}