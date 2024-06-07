import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthController from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.signin,
);

authRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.signup,
);

export default authRouter;
