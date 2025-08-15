import { LearnType } from "generated/prisma";

export class ResponseLearnDto {
    id: number;
    content: string;
    start: Date;
    end: Date | null;
    type: LearnType;
    pauseTime: number;
    createdAt: Date;
    subjectId: number | null;
}