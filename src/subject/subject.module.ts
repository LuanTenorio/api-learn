import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SubjectPrismaRepository } from "./repository/subjectPrisma.repository";
import { SubjectController } from "./subject.controller";
import { CreateSubjectUsecase } from "./usecase/createSubject.usecase";
import { RenameSubjectUsecase } from "./usecase/renameSubject.usecase";

@Module({
    imports: [PrismaModule],
    controllers: [SubjectController],
    providers: [
        {
            provide: "SubjectRepository",
            useClass: SubjectPrismaRepository
        },
        CreateSubjectUsecase,
        RenameSubjectUsecase
    ],
    exports: []
})
export class SubjectModule {

}