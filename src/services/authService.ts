import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User, { IUser, UserLogInfo } from '../models/User';

interface createUserPayload {
  username: string;
  email: string;
  password: string;
}
interface signInUserUserPayload {
  email: string;
  password: string;
}

/**
 * Signs Up a new user.
 *
 * @param {string} username - The username.
 * @param {string} email - The email.
 * @param {string} password - The password.
 * @returns {Promise<{success: boolean, message?: string}>} - The returning object with success or failure and error message.
 */
export const createUser = async ({
  username,
  email,
  password,
}: createUserPayload): Promise<{ success: boolean; message?: string }> => {
  const newPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: newPassword,
  } as IUser);

  try {
    await newUser.save();

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false };
  }
};

/**
 * Signs In a user using it's credentials.
 *
 * @param {string} email - The email.
 * @param {string} password - The password.
 * @returns {Promise<{success: boolean, token?: string, user?: IUser, message?: string}>} - The returning object with success or failure, User object and token on success or error message.
 */
export const signInUser = async ({
  email,
  password,
}: signInUserUserPayload): Promise<
  | {
      success: true;
      token: string;
      user: UserLogInfo;
    }
  | {
      success: false;
      message: 'Invalid credentials' | string;
    }
> => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return { success: false, message: 'Invalid credentials' };
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    return {
      success: true,
      token,
      user: { email: user.email, username: user.username },
    };
  } catch (error) {
    return { success: false, message: `System error: ${error}` };
  }
};
