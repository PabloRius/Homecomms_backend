import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import Hub, { IHub } from '../models/Hub';
import { addHubToUserInfo, UserInfoIdExists } from './userInfoController';

export const HubIdExists = async (id: string) => {
  return (await Hub.findById(id)) ? true : false;
};

export const createHub = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { name, description, createdBy, image } = req.body;

    const userInfoExists = await UserInfoIdExists(createdBy);
    if (!userInfoExists) {
      res.status(400).json({ message: 'Invalid createdBy ID, user not found' });
      return;
    }

    const hubExists = await Hub.findOne({ name, createdBy });
    if (hubExists) {
      res
        .status(400)
        .json({ message: 'Hub with the same name already exists' });
      return;
    }

    const newHubPartial: Partial<IHub> = new Hub({
      name,
      createdBy,
      participants: [createdBy],
    });
    if (description) newHubPartial.description = description;
    if (image) newHubPartial.CdnPhotoUrl = image;

    const newHub: IHub = new Hub(newHubPartial);

    await newHub.save();

    const { status, errorMsg } = await addHubToUserInfo(createdBy, newHub.id);
    if (status !== 200) {
      res.status(status).json({ message: errorMsg });
      return;
    }

    res.status(201).json(newHub);
  } catch (error) {
    console.error('Error creating hub:', error);
    res.status(500).json({ message: `Error creating the hub ${error}` });
  }
};

export const getHubById = async (
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
    const hub: IHub | null = await Hub.findById(id);

    if (!hub) {
      res.status(404).json({ message: `Hub with ID ${id} not found` });
      return;
    }

    res.status(200).json(hub);
  } catch (error) {
    console.error(`Error retrieving the hub: ${error}`);
    res.status(500).json({ message: `Error retrieving the hub: ${error}` });
  }
};

export const deleteHubById = async (
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
    const hub: IHub | null = await Hub.findByIdAndDelete(id);

    console.log(hub);

    if (!hub) {
      res.status(404).json({ message: `Hub with ID ${id} not found` });
      return;
    }

    res.status(200).json(hub);
  } catch (error) {
    console.error(`Error retrieving the hub: ${error}`);
    res.status(500).json({ message: `Error deleting the hub: ${error}` });
  }
};
