import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userSchema.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  if (user) {
    return res.json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    username: username,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username: username });

  if (!user) {
    return res.json({ message: 'User does not exist' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: 'Username or password does not match' });
  }

  //correct login
  const token = jwt.sign({ id: user._id }, 'secret'); //"secret" needed to verify

  res.json({ token: token, userID: user._id });
});

export { router as userRouter };
