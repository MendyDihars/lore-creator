import React, { useState } from 'react';
import type { Period } from '../types/period';

interface Props {
  periods: Period[],
  onChangeActive: any,
  active?: Period
}

const ChronologyDots = (props: Props) => {
  const { periods, onChangeActive, active } = props;
  const [hover, setHover] = useState(null);

  const handleHover = (period: Period) => () => {
    setHover(period);
  }

  return (
    <div className="chrono-breadcrumb">
      {
        periods.map((period: Period, index: number) => (
          <>
            <div
              key={period.id}
              className={`chrono-breadcrumb_dot ${active?.id === period.id ? 'chrono-breadcrumb_dot--active' : ''}`}
              onClick={onChangeActive(period)}
              onMouseEnter={handleHover(period)}
              onMouseLeave={handleHover(null)}
            >
              {hover?.id === period.id && <div className="chrono-breadcrumb_dot--popover">{hover?.name || ''}</div>}
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
  )
}

export default ChronologyDots;