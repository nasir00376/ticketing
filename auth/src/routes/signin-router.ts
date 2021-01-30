import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { User, UserDocument } from "../models/user.model";
import { BadRequestError } from "../error";
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';

const router: Router = Router();

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = (await User.findOne({ email })) as UserDocument;


    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(existingUser.password, password);

    if(!passwordMatch) throw new BadRequestError('Invalid credentials');

  
    const jwt = existingUser.generateToken();

    req.session = { jwt };
    res.status(200).send({ result: existingUser });
  }
);

export { router as SignInRouter };
