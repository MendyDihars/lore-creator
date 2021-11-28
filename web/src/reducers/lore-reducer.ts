import { createReducer } from '@reduxjs/toolkit';
import { fetch, find, select } from '../actions/lore-action';
import { unload, handlePendingAndRejected } from './helpers';
import type { LoreState, Lore } from '../types/lore';

const initialState: LoreState = {
  lores: []
}

const LoreReducer = createReducer(initialState, builder => {
  handlePendingAndRejected(builder, [find, fetch])
  builder
    .addCase(fetch.fulfilled, (state: LoreState, action): void => {
      unload(state);
      state.lores = action.payload as Lore[];
    })
    .addCase(find.fulfilled, (state: LoreState, action): void => {
      unload(state);
      state.lore = action.payload as Lore;
    })
    .addCase(select, (state: LoreState, action): void => {
      state.lore = action.payload as Lore;
    })
})

export default LoreReducer;