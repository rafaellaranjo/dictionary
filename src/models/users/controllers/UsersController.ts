import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import ListHistoryToUser from '@modules/entries/service/ListHistoryToUser';
import ListFavoritiesToUser from '@modules/entries/service/ListFavoritiesToUser';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const users = await createUser.execute({ name, email, password });

    return response.json(instanceToInstance(users));
  }

  public async listEntriesHistory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page = 1, pageSize = 10 } = request.query;
    let user_id;
    if (request !== undefined && request.user !== undefined) {
      user_id = request.user.id;
    } else {
      return response.status(400).json({ message: 'Failed to find user id.' });
    }

    try {
      const listHistoryToUser = new ListHistoryToUser();

      const entries = await listHistoryToUser.execute(user_id, {
        page: Number(page),
        pageSize: Number(pageSize),
      });

      return response.json(instanceToInstance(entries));
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to find history words.', error });
    }
  }

  public async listEntriesFavorities(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page = 1, pageSize = 10 } = request.query;
    let user_id;
    if (request !== undefined && request.user !== undefined) {
      user_id = request.user.id;
    } else {
      return response.status(400).json({ message: 'Failed to find user id.' });
    }

    try {
      const listFavoritiesToUser = new ListFavoritiesToUser();

      const entries = await listFavoritiesToUser.execute(user_id, {
        page: Number(page),
        pageSize: Number(pageSize),
      });

      return response.json(instanceToInstance(entries));
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to find favorite words.', error });
    }
  }
}
