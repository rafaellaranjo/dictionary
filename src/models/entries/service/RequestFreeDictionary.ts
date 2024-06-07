import AppError from '@shared/errors/AppError';
import axios from 'axios';

interface IRequest {
  word: string;
}

interface IResponse {
  token: string;
}

class FreeDictionaryService {
  public async getDefinition({ word }: IRequest): Promise<IResponse> {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      return response.data;
    } catch (error) {
      throw new AppError(
        `Error fetching definition for word "${word}": ${error}`,
      );
    }
  }
}

export default FreeDictionaryService;
