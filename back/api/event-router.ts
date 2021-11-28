import { save, find, cleanItem } from '../db/mongo';
import { Router } from 'express';
import createEventModel from '../db/models/event.model'
import { IEvent } from '../types';


const Model = createEventModel();

const create = async (req, res): Promise<void> => {
  try {
    const { body } = req;
    const { loreId } = req.params;
    body.lore = loreId;
    const event = new Model(body);
    await save(event);
    res.status(200).send(cleanItem(event));
  } catch (e) {
    res.status(500).send('Something wrong with event creation');
  }
}

const list = async (req, res): Promise<void> => {
  try {
    const { loreId } = req.params;
    const events: IEvent[] = await find({ lore: loreId }, Model);
    res.status(200).send(events);
  } catch (e) {
    res.status(404).send('No resource found');
  }
}

const findOne = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const events: IEvent[] = await find({ id }, Model);
    res.status(200).send(events[0]);
  } catch (e) {
    res.status(404).send('No resource found');
  }
}

const EventRouter = Router();
EventRouter.get('/lore/:loreId', list);
EventRouter.post('/lore/:loreId', create);
EventRouter.get('/:id', findOne);
export default EventRouter;