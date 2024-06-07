import { Router } from 'express';
const welcomeRouter = Router();

welcomeRouter.get('/', async (req, res) => {
  return res.json({ message: 'Fullstack Challenge 🏅 - Dictionary' });
});

export default welcomeRouter;
