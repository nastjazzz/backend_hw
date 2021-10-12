import express from 'express';
const userRouter = express.Router();

const loginAnswer = { id: 1, mail: 'test@mail.ru' };

const loginUser = (req, res) => {
  res.status(201).send(loginAnswer);
};

userRouter.route('/login').post(loginUser);

export default userRouter;
