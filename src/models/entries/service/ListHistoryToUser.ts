import AppError from '@shared/errors/AppError';
import { Entry } from '../typeorm/entities/Entry';
import { EntriesRepository } from '../typeorm/repositories/EntriesRepository';

interface IPaginatedResponse<T> {
  results: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface IPaginationOptions {
  page: number;
  pageSize: number;
}

class ListHistoryToUser {
  public async execute(
    user_id: string,
    { page, pageSize }: IPaginationOptions,
  ): Promise<IPaginatedResponse<Entry>> {
    try {
      const [results, totalDocs] = await EntriesRepository.findAndCount({
        where: { user_id },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const totalPages = Math.ceil(totalDocs / pageSize);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        results,
        totalDocs,
        page,
        totalPages,
        hasNext,
        hasPrev,
      };
    } catch (error) {
      throw new AppError(`Erro na requisição: ${error}`);
    }
  }
}

export default ListHistoryToUser;
