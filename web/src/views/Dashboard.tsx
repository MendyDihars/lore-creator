import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import type { Lore } from '../types/lore';
import type { Event as EventEntity } from '../types/event';
import Loading from '../components/Loading';
import { find } from '../actions/lore-action';
import { fetch } from '../actions/event-action';
import { Button, Typography } from '@mui/material';
import Modal from '../components/Modal';
import FormEvent from '../components/Forms/FormEvent';
import Event from '../components/Event';
import { toKey } from '../decorator';

const Dashboard = (props: {}) => {
  const dispatch: Dispatch = useDispatch();
  const lore: Lore = useSelector((state: any) => state.lores?.lore);
  const events: EventEntity[] = useSelector((state: any) => state.events?.events);
  const loreLoading: boolean = useSelector((state: any) => state.lores?.loading);
  const eventLoading: boolean = useSelector((state: any) => state.events?.loading);
  const [newEvent, setNewEvent] = useState(false);
  const loading = loreLoading && eventLoading;

  useEffect(() => {
    const id = sessionStorage.getItem('lore')
    if (!lore) {
      if (id) {
        dispatch(find(id) as any);
      }
    }
    if (!events?.length) {
      dispatch(fetch(id) as any);
    }
  }, [])

  const toggleNewEvent = (isOpen: boolean) => () => {
    setNewEvent(isOpen);
  }

  return (
    <>
      {loading && <Loading />}
      <div className="dashboard">
        <div className="flexcenter">
          <Typography variant="h2">{lore?.name}</Typography>
        </div>
        <div className="flexcenter mt-32">
          <Button color="secondary" variant="outlined" onClick={toggleNewEvent(true)}>
            Nouvel événement
          </Button>
        </div>
        <div className="events-wrapper mt-32">
          {
            events.map((event: EventEntity) => (
              <Event  event={event} key={toKey(event)} />
            ))
          }
        </div>
        <Modal isOpen={newEvent} toggle={toggleNewEvent}>
          <FormEvent onClose={toggleNewEvent(false)} edition={false} />
        </Modal>
      </div>
    </>
  )
}

export default Dashboard;