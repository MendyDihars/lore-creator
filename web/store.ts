import { TypedUseSelectorHook, useSelector as useSelectorRedux } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import LoreReducer from './src/reducers/lore-reducer';
import EventReducer from './src/reducers/event-reducer';
import PeriodReducer from './src/reducers/period-reducer';

const middleware = defaultMiddleware => defaultMiddleware().concat(logger);

export const store = configureStore({
  reducer : {
    lores: LoreReducer,
    events: EventReducer,
    periods: PeriodReducer
  },
  middleware
});

type GlobalState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<GlobalState> = useSelectorRedux;