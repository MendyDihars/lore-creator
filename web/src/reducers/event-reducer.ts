import { createReducer } from '@reduxjs/toolkit';
import { create, fetch } from '../actions/event-action';
import { unload, handlePendingAndRejected } from './helpers';
import type { EventState, Event } from '../types/event';

const initialState: EventState = {
  events: [],
  loading: false
}

const EventReducer = createReducer(initialState, builder => {
  handlePendingAndRejected(builder, [create, fetch]);
  builder
    .addCase(create.fulfilled, (state: EventState, action): void => {
      unload(state);
      state.events = [ ...state.events, action.payload] as Event[];
      state.event = action.payload as Event;
    })
    .addCase(fetch.fulfilled, (state: EventState, action): void => {
      unload(state);
      state.events = action.payload;
    })
})

export default EventReducer;