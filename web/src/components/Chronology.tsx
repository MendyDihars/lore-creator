import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
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
  const [hover, setHover] = useState(null);

  const handleActive = (period: Period) => () => {
    setActive(period);
  }

  const handleHover = (period: Period) => () => {
    setHover(period);
  }

  const eventsPeriod = events.filter((event: EventEntity) => event.period === active?.id);

  useEffect(() => {
    if (loreId) {
      if (!events?.length) {
        dispatch(fetchEvents(loreId) as any);
      }
      if (!periods?.length) {
        dispatch(fetchPeriods(loreId) as any);
      } else if (periods.length && !active) {
        setActive(periods[0]);
      }
    }
  })

  return (
    <div className="chrono">
      <div className="chrono-breadcrumb">
        {
          periods.map((period: Period, index: number) => (
            <>
              <div
                key={period.id}
                className={`chrono-breadcrumb_dot ${active?.id === period.id ? 'chrono-breadcrumb_dot--active' : ''}`}
                onClick={handleActive(period)}
                onMouseEnter={handleHover(period)}
                onMouseLeave={handleHover(null)}
              >
              </div>
              {
                index !== (periods.length - 1) && (
                  <div className="chrono-breadcrumb_link"></div>
                )
              }
            </>
          ))
        }
      </div>
      {hover && <div className="chrono-dot-hover">{hover?.name || ''}</div>}
      <div className="chrono-period">
        <div className="chrono-period-title">{active?.name}</div>
        {eventsPeriod.map(event => (
          <ul key={event.id}>
            <li>{event.name}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Chronology;