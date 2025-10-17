import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import { register, login } from '../controllers/authController.js';// <- imports controller functions that handle the logic

const router = Router();


router.post(
  '/register', //<- call the 'register' controller to create the user in the database
  validate([
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be 2–100 characters'),
    body('email').isEmail().withMessage('Please provide valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ]),
  register
);


router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Please provide valid email'),
    body('password').isLength({ min: 1 }).withMessage('Please provide password'),
  ]),
  login
);

export default router;
