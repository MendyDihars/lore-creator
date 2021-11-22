import React from 'react';
import type { Event as EventEntity } from '../types/event';
import { Card, Typography, Button } from '@mui/material';

interface Props {
  event: EventEntity
}

const Event = (props: Props) => {
  const { event } = props;
  return (
    <Card classes={{ root: 'event' }}>
      <Typography classes={{ root: 'event-title' }} variant="h4">
        {event.name}
      </Typography>
      {event.image && <img src={event.image} alt={event.name} className="event-img" />}
      <div className="event-button">
        <Button variant="contained">
          Go
        </Button>
      </div>
    </Card>
  )
}

export default Event;