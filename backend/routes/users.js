import express from 'express';
import usersCtrl from '../controllers/users.js';

const router = express.Router();

router.post('/login', usersCtrl.logIn);
router.post('/signup', usersCtrl.signUp);

export default router;