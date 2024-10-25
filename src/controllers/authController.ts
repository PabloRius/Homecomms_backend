import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { createUser, signInUser } from '../services/authService';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Bad request parameters' });
    return;
  }
  const result = await createUser(req.body);
  if (result.success) {
    res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Bad request parameters' });
    return;
  }
  const result = await signInUser(req.body);
  if (result.success) {
    res
      .cookie('homecommtoken', result.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, //ms * s * m * h
      })
      .status(StatusCodes.OK)
      .json(result.user);
  } else {
    if (result.message === 'Invalid credentials') {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid email or password' });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
};
