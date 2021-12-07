import { create as createEvent, find, cleanItem } from '../db/mongo';
import { Router } from 'express';
import createEventModel from '../db/models/event.model'
import { IEvent } from '../types';


const EventModel = createEventModel();

const create = async (req, res): Promise<void> => {
  try {
    const { body } = req;
    const { loreId } = req.params;
    body.lore = loreId;
    const event = await createEvent(body, EventModel);
    res.status(200).send(cleanItem(event));
  } catch (e) {
    res.status(500).send('Something wrong with event creation');
  }
}

const list = async (req, res): Promise<void> => {
  try {
    const { loreId } = req.params;
    const events: IEvent[] = await find({ lore: loreId }, EventModel);
    res.status(200).send(events);
  } catch (e) {
    res.status(404).send('No resource found');
  }
}

const findOne = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const events: IEvent[] = await find({ id }, EventModel);
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