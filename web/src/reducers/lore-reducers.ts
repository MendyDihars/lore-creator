import { createReducer } from '@reduxjs/toolkit';
import LoreAction from '../actions/lore-action';
import type { LoreState, Lore } from '../types/lore';

export default class LoreReducer {
  private readonly _initialState: LoreState = {
    lores: []
  }

  private _loreAction = new LoreAction();

  private unload = (state) => state.loading = false;

  public reducer() {
    const fetch = this._loreAction.fetch;
    return createReducer(this._initialState, builder => {
      builder
        .addCase(fetch.pending, (state, _) => { this.unload(state); })
        .addCase(fetch.fulfilled, (state, action) => {
          state.loading = false;
          state.lores = action.payload as Lore[];
        })
        .addCase(fetch.rejected, (state, _) => { this.unload(state) })
    })
  }
}