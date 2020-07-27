import { Router } from 'express';

const router: Router = Router();

router.get('/currentUser', (req, res) => res.send('Hi there'));

export { router as CurrentUserRouter }