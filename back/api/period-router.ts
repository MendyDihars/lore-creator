import createPeriodModel from "../db/models/period.model";
import PeriodService from '../services/period-service';
import { Router } from 'express';
import { find } from "../db/mongo";
import { IPeriod } from "../types";

const PeriodModel = createPeriodModel();

const create = async (req, res) => {
  try {
    const { body } = req;
    const { loreId } = req.params;
    body.lore = loreId;
    const periods: IPeriod[] = await PeriodService.createNewPeriod(body, PeriodModel);
    res.status(200).send(periods);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
}

const list = async (req, res) => {
  try {
    const { loreId } = req.params;
    const periods: IPeriod[] = await find({ lore: loreId }, PeriodModel);
    res.status(200).send(PeriodService.sortPeriods(periods));
  } catch (e) {
    res.status(404).send('Resources not found');
  }
}

const PeriodRouter = Router();
PeriodRouter.get('/lores/:loreId', list);
PeriodRouter.post('/lores/:loreId', create);
export default PeriodRouter;