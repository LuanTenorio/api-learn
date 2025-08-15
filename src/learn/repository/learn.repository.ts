import { addLearnDto } from "../dto/addLearn.dto";
import { ResponseLearnDto } from "../dto/responseLearn.dto";

export interface LearnRepository {
    addLearn(learnDto: addLearnDto): Promise<ResponseLearnDto>;
    checkLearnExistsByNameAndSubjectId(content: string, subjectId: number): Promise<boolean>;
}
