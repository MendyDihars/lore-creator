import React from 'react';
import type { Event as EventEntity } from '../types/event';
import { Typography } from '@mui/material';

interface Props {
  event: EventEntity
}

const Event = (props: Props) => {
  const { event } = props;
  return (
    <div className="event">
      <img src={event.image} className="event-image" />
      <div className="event-box-content">
        <Typography variant="h5" classes={{ root: 'event-title' }}>
          {event.name}
        </Typography>
        <div className="event-content">
          {event?.content}
        </div>
      </div>
    </div>
  )
}

export default Event;