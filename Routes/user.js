import express from 'express';
import { register, login } from '../Controllers/user.js';

const router = express.Router();
//user register.
// @api dsc :- uaer register
// @api method :- post
// @api endpoint :- /api/user/register
router.post('/register', register);

//user login.
// @api dsc :- uaer login
// @api method :- post
// @api endpoint :- /api/user/login
router.post('/login', login);

export default router;