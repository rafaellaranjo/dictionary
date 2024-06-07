import { Entry } from '../entities/Entry';
import { AppDataSource } from '@shared/typeorm/data-source';

export const EntriesRepository = AppDataSource.getRepository(Entry).extend({
  async findByWord(word: string): Promise<Entry | null> {
    return await this.findOne({ where: { word } });
  },

  async findByHistoryUserId(user_id: string): Promise<Entry[]> {
    return await this.find({ where: { user_id } });
  },

  async findByFavoritesUserId(user_id: string): Promise<Entry[]> {
    return await this.find({ where: { user_id, favorite: true } });
  },

  async markAsFavorite(id: string): Promise<void> {
    await this.update(id, { favorite: true });
  },

  async unmarkAsFavorite(id: string): Promise<void> {
    await this.update(id, { favorite: false });
  },
});
