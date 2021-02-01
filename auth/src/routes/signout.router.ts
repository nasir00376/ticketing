import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
  req.session = null;

  res.send({})
});

export { router as SignOutRouter };
