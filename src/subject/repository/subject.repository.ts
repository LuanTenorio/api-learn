import { PaginationDto } from "src/pagination/dto/pagination.dto";
import { CreateSubjectDto } from "../dto/createSubject.dto";
import { RenameSubjectDto } from "../dto/renameSubject.dto";
import { ResponseSubjectDto } from "../dto/responseSubject.dto";

export interface SubjectRepository {
    createSubject(data: CreateSubjectDto): Promise<ResponseSubjectDto>
    checkSubjectExistsByNameAndUserId(name: string, userId: number): Promise<boolean>
    renameSubject(userId: number, data: RenameSubjectDto): Promise<ResponseSubjectDto>
    deleteSubject(userId: number, id: number): Promise<void>
    pagination(userId: number, pagination: PaginationDto<ResponseSubjectDto>)
}