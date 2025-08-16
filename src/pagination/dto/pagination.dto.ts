import { Type } from "class-transformer";
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class PaginationDto<T, K = T> {

    @Type(() => Number)
    @IsNumber()
    @Min(1, { message: "page must be greater than or equal to 1" })
    page: number = 1;
    
    @Type(() => Number)
    @IsNumber()
    @Min(1, { message: "limit must be greater than or equal to 1" })
    @Max(50, { message: "limit must be less than or equal to 50" })
    limit: number = 10;

    @IsString()
    @IsEnum(["asc", "desc"], { message: "orderBy must be either 'asc' or 'desc'" })
    @IsOptional()
    orderBy: "asc" | "desc" = "asc";

    @IsOptional()
    where?: Partial<Record<keyof T, any>>;

    @IsEmpty()
    total: number;

    @IsEmpty()
    data: K[];
}