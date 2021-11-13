import { createAsyncThunk } from '@reduxjs/toolkit';
import LoreService from '../services/lore-service';
import type { Lore } from '../types/lore';
import { FETCH_LORE } from '../constants';

export default class LoreAction {
  private _service = new LoreService();

  public get fetch() {
    return createAsyncThunk(FETCH_LORE, async (): Promise<Lore[]> => {
      const lores: Lore[] = await this._service.fetchLores();
      return lores;
    })
  }
}