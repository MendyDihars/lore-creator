import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import LoreService from '../services/lore-service';
import type { Lore } from '../types/lore';
import { FETCH_LORE, SELECT_LORE, FIND_LORE } from '../constants';

export default class LoreAction {
  private _service = new LoreService();

  public get fetch() {
    return createAsyncThunk(FETCH_LORE, async (): Promise<Lore[]> => {
      return await this._service.fetchLores();
    })
  }

  public get find() {
    return createAsyncThunk(FIND_LORE, async (id: string): Promise<Lore> => {
      return await this._service.findLore(id);
    })
  }

  public get select() {
    return createAction<Lore>(SELECT_LORE);
  }
}