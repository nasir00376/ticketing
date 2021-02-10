import { Router } from "express";

const router: Router = Router();

router.post("/", (req, res) => {
  req.session = null;

  res.send({})
});

export { router as SignOutRouter };
