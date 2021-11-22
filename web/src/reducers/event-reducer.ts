import { createReducer } from '@reduxjs/toolkit';
import { create, fetch } from '../actions/event-action';
import type { EventState, Event } from '../types/event';

const initialState: EventState = {
  events: [],
  loading: false
}

const unload = state => state.loading = false;
const load = state => state.loading = true;

const EventReducer = createReducer(initialState, builder => {
  [create, fetch].forEach(action => {
    builder
      .addCase(action.pending, (state, _) => { load(state); })
      .addCase(action.rejected, (state, _) => { unload(state); })
  })
  builder
    .addCase(create.fulfilled, (state, action) => {
      unload(state);
      state.events = [ ...state.events, action.payload] as Event[];
      state.event = action.payload as Event;
    })
    .addCase(fetch.fulfilled, (state, action) => {
      unload(state);
      state.events = action.payload;
    })
})

export default EventReducer;