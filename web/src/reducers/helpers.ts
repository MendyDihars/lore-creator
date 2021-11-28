import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";

export const unload = state => state.loading = false;
export const load = state => state.loading = true;
export const handlePendingAndRejected = (builder: ActionReducerMapBuilder<any>, actions: Array<AsyncThunk<any, any, any>>): void => {
  actions.forEach(action => {
    builder
      .addCase(action.pending, (state, _) => { load(state); })
      .addCase(action.rejected, (state, _) => { unload(state); })
  })
}