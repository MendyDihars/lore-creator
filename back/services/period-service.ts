import { IPeriod } from '../types';
import { ApiError } from '../errors';
import { create, cleanItem, find, update } from '../db/mongo';
import { Model } from 'mongoose';

export default class PeriodService {
  public static sortPeriods(periods: IPeriod[]): IPeriod[] {
    return periods.sort((a, b) => a.position > b.position ? 1 : -1);
  }

  public static async createNewPeriod(period: any, PeriodModel: Model<any>): Promise<IPeriod[]> {
    try {
      const periods: IPeriod[] = await find({ lore: period.lore }, PeriodModel);
      if (period?.position < 0 && period?.position > (periods.length + 1)) {
        throw new ApiError(400, 'Period position invalid');
      } else if (!period.position) {
        return await this.addPeriod(periods, period, PeriodModel);
      } else {
        return await this.insertPeriod(periods, period, PeriodModel);
      }
    } catch (e) {
      throw new ApiError(500, 'Something wrong with period creation');
    }
  }

  private static async addPeriod(periods: IPeriod[], period: IPeriod, PeriodModel: Model<any>): Promise<IPeriod[]> {
    period.position = periods.length || 1;
    await create(period, PeriodModel);
    periods.push(period);
    return periods;
  }

  private static async insertPeriod(periods: IPeriod[], period: IPeriod, PeriodModel: Model<any>): Promise<IPeriod[]> {
    try {
      const filteredPeriods: IPeriod[] = periods.filter(p => p.position >= period.position);
      for (const currentPeriod of filteredPeriods) {
        currentPeriod.position += 1;
        await update(currentPeriod, PeriodModel);
      }
      const instance = new PeriodModel(period);
      await create(instance, PeriodModel);
      periods.push(cleanItem(instance));
      return this.sortPeriods(periods);
    } catch (err) {
      throw err;
    }
  }
}