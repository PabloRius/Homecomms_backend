import { Request, Response } from 'express';
import Item, { IItem } from '../models/Items';

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items: IItem[] = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving the items ${error}` });
  }
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    const newItem: IItem = new Item({ name, description });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: `Error creating the item ${error}` });
  }
};

export const getItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const item: IItem | null = await Item.findById(id);

    if (!item) {
      res.status(404).json({ message: `Item ${id} not found` });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving the item ${error}` });
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedItem: IItem | null = await Item.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: `Error updating the item ${error}` });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedItem: IItem | null = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting the item ${error}` });
  }
};
