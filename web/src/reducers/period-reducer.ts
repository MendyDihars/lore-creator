import { createReducer } from '@reduxjs/toolkit';
import { create, fetch } from '../actions/period-action';
import { unload, handlePendingAndRejected } from './helpers';
import type { PeriodState, Period } from '../types/period';

const initialState: PeriodState = {
  periods: [],
  loading: false
}

const PeriodReducer = createReducer(initialState, builder => {
  handlePendingAndRejected(builder, [create, fetch]);
  builder
    .addCase(create.fulfilled, (state, action): void => {
      unload(state);
      state.periods = action.payload as Period[];
    })
    .addCase(fetch.fulfilled, (state, action): void => {
      unload(state);
      state.periods = action.payload as Period[];
    })
})

export default PeriodReducer;