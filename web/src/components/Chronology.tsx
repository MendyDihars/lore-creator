import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Typography } from '@mui/material';
import ChronologyDots from './ChronologyDots';
import Event from './Event';
import { useSelector } from '../../store';
import { fetch as fetchEvents } from '../actions/event-action';
import { fetch as fetchPeriods } from '../actions/period-action';

import type { Period } from '../types/period';
import type { Event as EventEntity } from '../types/event';

interface Props {
  loreId: string;
}

const Chronology = (props: Props) => {
  const { loreId } = props;
  const periods: Period[] = useSelector(state => state.periods?.periods);
  const events: EventEntity[] = useSelector(state => state.events?.events);
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const [retry, setRetry] = useState(0); // If periods or events is empty, prevents infinite loop

  const handleActive = (period: Period) => () => {
    setActive(period);
  }

  const eventsPeriod = events.filter((event: EventEntity) => event.period === active?.id);

  useEffect(() => {
    if (retry < 3 && loreId) {
      if (!events?.length) {
        dispatch(fetchEvents(loreId) as any);
      }
      if (!periods?.length) {
        dispatch(fetchPeriods(loreId) as any);
      }
      setRetry(retry + 1);
    }
    if (loreId && periods?.length && !active) {
      setActive(periods[0]);
    }
  })

  return (
    <div className="chrono">
      <ChronologyDots periods={periods} onChangeActive={handleActive} active={active} />
      <div className="chrono-period">
        <Typography variant="h3" classes={{ root: 'chrono-period-title' }}>{active?.name}</Typography>
        <div className="chrono-events">
          {eventsPeriod.map(event => (
            <div className="chrono-events_event">
              <Event key={event.id} event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chronology;