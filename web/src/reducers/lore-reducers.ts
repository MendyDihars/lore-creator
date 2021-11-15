import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import LoreAction from '../actions/lore-action';
import { SELECT_LORE } from '../constants';
import type { LoreState, Lore } from '../types/lore';

export default class LoreReducer {
  private readonly _initialState: LoreState = {
    lores: []
  }

  private _loreAction = new LoreAction();

  private unload = (state) => state.loading = false;
  private load = (state) => state.loading = true;

  public reducer() {
    const { fetch, select, find } = this._loreAction;
    return createReducer(this._initialState, builder => {
      [fetch, find].forEach(action => {
        builder
          .addCase(action.pending, (state, _) => { this.load(state) })
          .addCase(action.rejected, (state, _) => { this.unload(state) });
      });
      builder
        .addCase(fetch.fulfilled, (state, action) => {
          this.unload(state);
          state.lores = action.payload as Lore[];
        })
        .addCase(find.fulfilled, (state, action) => {
          this.unload(state);
          state.current = action.payload as Lore;
        })
        .addCase(select, (state, action) => {
          state.current = action.payload;
        })
    })
  }
}