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
      <Typography variant="h4" classes={{ root: 'event-title' }}>
        {event.name}
      </Typography>
      <img src={event.image} className="event-image" />
      <div className="event-content"></div>
    </div>
  )
}

export default Event;