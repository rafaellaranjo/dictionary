import AppError from '@shared/errors/AppError';
import { Entry } from '../typeorm/entities/Entry';
import { EntriesRepository } from '../typeorm/repositories/EntriesRepository';

interface IRequest {
  word: string;
  user_id: string;
}

class CreateEntryService {
  public async execute({ word, user_id }: IRequest): Promise<Entry> {
    try {
      const entry = EntriesRepository.create({
        word,
        favorite: false,
        user_id,
      });

      await EntriesRepository.save(entry);

      return entry;
    } catch (error) {
      throw new AppError(`Erro na requisição: ${error}`);
    }
  }
}

export default CreateEntryService;
