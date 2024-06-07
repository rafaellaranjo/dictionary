import { EntriesRepository } from '../typeorm/repositories/EntriesRepository';

class FavoriteWordService {
  async markAsFavorite(id: string): Promise<void> {
    await EntriesRepository.markAsFavorite(id);
  }

  async unmarkAsFavorite(id: string): Promise<void> {
    await EntriesRepository.unmarkAsFavorite(id);
  }
}

export default FavoriteWordService;
