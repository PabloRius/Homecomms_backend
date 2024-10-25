import { Request, Response } from 'express';
import UserInfo, { IUserInfo } from '../models/UserInfo';
import { validationResult } from 'express-validator';
import { HubIdExists } from './hubController';

export const UserInfoIdExists = async (id: string): Promise<boolean> => {
  return (await UserInfo.findById(id)) ? true : false;
};

const UserInfoUsernameExists = async (username: string): Promise<boolean> => {
  return (await UserInfo.findOne({ username })) ? true : false;
};

export const createUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { username } = req.body;

    const usernameExists = await UserInfoUsernameExists(username);
    if (usernameExists) {
      res
        .status(400)
        .json({ message: 'User with the same username already exists' });
      return;
    }

    const newArray = new Array<string>(0);
    const newUserInfo: IUserInfo = new UserInfo({ username, newArray });
    await newUserInfo.save();

    res.status(201).json(newUserInfo);
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({ message: `Error creating the user info ${error}` });
  }
};

export const addHubToUserInfo = async (
  userId: string,
  hubId: string
): Promise<{ status: number; errorMsg?: string }> => {
  try {
    const userInfo = await UserInfo.findById(userId);
    const hubExists = await HubIdExists(hubId);
    if (!userInfo) {
      return {
        status: 400,
        errorMsg: "Error updating the profile, user ID doesn't exist",
      };
    }
    if (!hubExists) {
      return {
        status: 400,
        errorMsg: "Error updating the profile, hub ID doesn't exist",
      };
    }

    const oldHubsList = userInfo.hubs;
    if (hubId in oldHubsList) {
      return {
        status: 400,
        errorMsg:
          'Error updating the profile, the user is already part of this hub',
      };
    }
    await userInfo.updateOne({ hubs: [...oldHubsList, hubId] });
    return { status: 200 };
  } catch (error) {
    console.error(`Error retrieving the user info: ${error}`);
    return {
      status: 500,
      errorMsg: `Error retrieving the user info: ${error}`,
    };
  }
};

export const getUserInfoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.params;
    const userInfo: IUserInfo | null = await UserInfo.findById(id);

    if (!userInfo) {
      res.status(404).json({ message: `UserInfo with ID ${id} not found` });
      return;
    }

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(`Error retrieving the user info: ${error}`);
    res
      .status(500)
      .json({ message: `Error retrieving the user info: ${error}` });
  }
};
