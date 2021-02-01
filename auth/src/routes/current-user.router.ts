import { Router } from "express";
import { currentUser } from '../middlewares/current-user';

const router: Router = Router();

router.get("/", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null })
});

export { router as CurrentUserRouter };
