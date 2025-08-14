import { CreateSubjectDto } from "../dto/createSubject.dto";
import { ResponseSubjectDto } from "../dto/responseSubject.dto";

export interface SubjectRepository {
    createSubject(data: CreateSubjectDto): Promise<ResponseSubjectDto>
    checkSubjectExistsByNameAndUserId(name: string, userId: number): Promise<boolean>
}