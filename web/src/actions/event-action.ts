import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEvent, fetchEvents } from '../services/event-service';
import type { Event } from '../types/event';
import { CREATE_EVENT, FETCH_EVENT } from '../constants';

export const create = createAsyncThunk(CREATE_EVENT, async (data: { id: string; event: Event }): Promise<Event> => {
  return await createEvent(data.id, data.event);
});

export const fetch = createAsyncThunk(FETCH_EVENT, async (lore_id: string): Promise<Event[]> => {
  return await fetchEvents(lore_id);
});