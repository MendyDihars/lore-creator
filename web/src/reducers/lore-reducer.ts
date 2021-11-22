import { createReducer } from '@reduxjs/toolkit';
import { fetch, find, select } from '../actions/lore-action';
import type { LoreState, Lore } from '../types/lore';

const initialState: LoreState = {
  lores: []
}

const unload = state => state.loading = false;
const load = state => state.loading = true;

const LoreReducer = createReducer(initialState, builder => {
  [fetch, find].forEach(action => {
    builder
      .addCase(action.pending, (state, _) => { load(state) })
      .addCase(action.rejected, (state, _) => { unload(state) })
  })
  builder
    .addCase(fetch.fulfilled, (state, action) => {
      unload(state);
      state.lores = action.payload as Lore[];
    })
    .addCase(find.fulfilled, (state, action) => {
      unload(state);
      state.lore = action.payload as Lore;
    })
    .addCase(select, (state, action) => {
      state.lore = action.payload as Lore;
    })
})

export default LoreReducer;