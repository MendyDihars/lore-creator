import { save, cleanItem, find } from '../db/mongo';
import { Router } from 'express';
import createLoreModel from '../db/models/lore.model'
import { ILore } from '../types';

const LoreModel = createLoreModel();

const create = async (req, res): Promise<void> => {
  try {
    const { body } = req;
    const lore = new LoreModel(body);
    await save(lore);
    res.status(200).send(cleanItem(lore));
  } catch (e) {
    console.log('error', e)
    res.status(500).send('Something wrong with lore creation');
  }
}

const list = async (req, res): Promise<void> => {
  try {
    const lores: ILore[] = await find({}, LoreModel);
    res.status(200).send(lores);
  } catch (e) {
    console.log('error', e);
    res.status(404).send('No resource found');
  }
}

const findOne = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const lores: ILore[] = await find({ id }, LoreModel);
    res.status(200).send(lores[0]);
  } catch (e) {
    console.log('error', e);
    res.status(404).send('No resource found');
  }
}

const LoreRouter = Router();
LoreRouter.get('/', list);
LoreRouter.post('/', create);
LoreRouter.get('/:id', findOne);
export default LoreRouter;