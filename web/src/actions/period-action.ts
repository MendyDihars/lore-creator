import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_PERIOD, FETCH_PERIOD } from "../constants";
import { createPeriod, fetchPeriods } from "../services/period-service";
import type { Period } from '../types/period';

export const create = createAsyncThunk(CREATE_PERIOD, async (data: { period: Period, loreId: string }): Promise<Period[]> => {
  return await createPeriod(data.period, data.loreId);
})

export const fetch = createAsyncThunk(FETCH_PERIOD, async (loreId: string): Promise<Period[]> => {
  return await fetchPeriods(loreId);
})