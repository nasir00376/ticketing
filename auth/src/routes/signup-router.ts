import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user.model';
import { RequestValidationError, BadRequestError } from '../error';

const router: Router = Router();

router.post('/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid.'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters.')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) { throw new RequestValidationError(errors.array()) }

  const { email, password } = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser) {
    throw new BadRequestError('Email already taken.')
  }

  const user = User.build({ email, password })
  await user.save();
  res.status(201).send({result: user}) 
});

export { router as SignUpRouter }