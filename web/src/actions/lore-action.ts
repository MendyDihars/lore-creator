import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLores, findLore } from '../services/lore-service';
import type { Lore } from '../types/lore';
import { FETCH_LORE, SELECT_LORE, FIND_LORE } from '../constants';

export const fetch = createAsyncThunk(FETCH_LORE, async (): Promise<Lore[]> => {
  return await fetchLores();
});

export const find = createAsyncThunk(FIND_LORE, async (id: string): Promise<Lore> => {
  return await findLore(id);
});

export const select = createAction<Lore>(SELECT_LORE);