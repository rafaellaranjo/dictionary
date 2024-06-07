import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(isAuthenticated);

usersRouter.get('/me', usersController.index);

usersRouter.get('/me/history', usersController.listEntriesHistory);

usersRouter.get('/me/favorites', usersController.listEntriesFavorities);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
