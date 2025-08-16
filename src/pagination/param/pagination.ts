import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { PaginationDto } from '../dto/pagination.dto';

export const Pagination = createParamDecorator(
  async (data: string[] = [], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const filteredQuery = Array.isArray(data)
      ? Object.keys(query).reduce((acc, key) => {
          if (!data.includes(key)) acc[key] = query[key]

          return acc
        }, {})
      : query

    const paginationDto = plainToInstance(PaginationDto, filteredQuery);

    try {
        await validateOrReject(paginationDto);
    } catch (e) {
        console.error('Validation failed:', e);
        throw new BadRequestException();
    }

    return paginationDto;
  },
);
