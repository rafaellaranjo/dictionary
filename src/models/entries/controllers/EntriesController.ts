import { Request, Response } from 'express';
import FavoriteWordService from '../service/FavoriteWordService';
import CreateEntryService from '../service/CreateEntryService';
import FreeDictionaryService from '../service/RequestFreeDictionary';

class EntriesController {
  public async findWordDictionary(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { word } = request.params;
    let user_id;
    if (request !== undefined && request.user !== undefined) {
      user_id = request.user.id;
    } else {
      return response.status(400).json({ message: 'Failed to find user id.' });
    }

    try {
      const freeDictionaryService = new FreeDictionaryService();
      const createEntryService = new CreateEntryService();

      const definition = await freeDictionaryService.getDefinition({ word });

      await createEntryService.execute({ word, user_id });

      return response.status(200).json({ data: definition });
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to find word dictionary.', error });
    }
  }

  public async markAsFavorite(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    try {
      const favoriteWordService = new FavoriteWordService();
      await favoriteWordService.markAsFavorite(id);
      return response
        .status(200)
        .json({ message: 'Entry marked as favorite.' });
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to mark entry as favorite.', error });
    }
  }

  public async unmarkAsFavorite(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    try {
      const favoriteWordService = new FavoriteWordService();
      await favoriteWordService.unmarkAsFavorite(id);
      return response
        .status(200)
        .json({ message: 'Entry unmarked as favorite.' });
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to unmark entry as favorite.', error });
    }
  }
}

export default EntriesController;
