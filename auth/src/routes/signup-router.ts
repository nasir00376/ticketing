import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user.model";
import { BadRequestError } from "../error";
import { validateRequest } from '../middlewares/validate-request';

const router: Router = Router();

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already taken.");
    }

    const user = User.build({ email, password });
    await user.save();
    const jwt = user.generateToken();

    req.session = { jwt };
    res.status(201).send({ result: user });
  }
);

export { router as SignUpRouter };
