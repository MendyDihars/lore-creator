import { IPeriod } from '../types';
import { ApiError } from '../errors';
import { save, cleanItem, find } from '../db/mongo';
import { Model } from 'mongoose';

export default class PeriodService {
  public static sortPeriods(periods: IPeriod[]): IPeriod[] {
    return periods.sort((a, b) => a.position > b.position ? 1 : -1);
  }

  public static async createNewPeriod(body: any, PeriodModel: Model<any>): Promise<IPeriod[]> {
    try {
      const period = new PeriodModel(body);
      const periods: IPeriod[] = await find({ lore: body.lore }, PeriodModel);
      if (period?.position < 0 && period?.position > (periods.length + 1)) {
        throw new ApiError(400, 'Period position invalid');
      } else if (!period.position) {
        return await this.addPeriod(periods, period);
      } else {
        return await this.insertPeriod(periods, period);
      }
    } catch (e) {
      throw new ApiError(500, 'Something wrong with period creation');
    }
  }

  private static async addPeriod(periods: IPeriod[], period: IPeriod): Promise<IPeriod[]> {
    period.position = periods.length || 1;
    await save(cleanItem(period));
    periods.push(period);
    return periods;
  }

  private static async insertPeriod(periods: IPeriod[], period: IPeriod): Promise<IPeriod[]> {
    const filteredPeriods: IPeriod[] = periods.filter(p => p.position >= period.position);
    for (const currentPeriod of filteredPeriods) {
      currentPeriod.position += 1;
      await save(currentPeriod);
    }
    await save(period);
    periods.push(period);
    return this.sortPeriods(periods);
  }
}