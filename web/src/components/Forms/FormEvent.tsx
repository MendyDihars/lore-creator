import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { TextField, Typography, Button, MenuItem } from '@mui/material';
import ImageField from './ImageField';
import { create } from '../../actions/event-action';
import { fetch as fetchPeriods } from '../../actions/period-action';
import type { Event } from '../../types/event';
import type { Lore } from '../../types/lore';
import type { Period } from '../../types/period';

interface Props {
  event?: Event
  onClose: any;
}

const FormEvent = (props: Props) => {
  const { event, onClose } = props;
  const lore: Lore = useSelector(state => state.lores?.lore)
  const periods: Period[] = useSelector(state => state.periods?.periods);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [periodId, setPeriodId] = useState('');

  const close = (e) => {
    onClose(e);
    setName('');
    setImage('');
    setPeriodId('');
  }

  const save = (e) => {
    if (!event) {
      dispatch(create({ id: lore.id, event: { name, image, period: periodId, content } }) as any);
      close(e);
    }
  }

  const handleName = e => {
    setName(e?.target?.value);
  }

  const handleImage = e => {
    setImage(e?.target?.value);
  }

  const handlePeriod = (id: string) => () => {
    setPeriodId(id);
  }

  const handleContent = e => {
    if (e?.target?.value) {
      setContent(e.target.value);
    }
  }

  useEffect(() => {
    if (event) {
      setName(event.name);
      setImage(event.image);
      setPeriodId(event.period);
      setContent(event.content);
    }
    if (!periods.length) {
      dispatch(fetchPeriods(lore.id));
    }
  }, [])

  return (
    <div className="group-inputs overflow">
      <Typography classes={{ root: 'textcenter' }} variant="h4">
        {!!event ? 'Editer un événement' : 'Créer un événement'}
      </Typography>
      <TextField classes={{ root: "input" }} required label="Nom" value={name} onChange={handleName} />
      <ImageField url={image} label="Image" onChange={handleImage} />
      <TextField
        select
        value={periodId}
        label="Période"
      >
        {
          periods.map(period => (
            <MenuItem key={period.id} value={period.id} onClick={handlePeriod(period.id)}>{period.name}</MenuItem>
          ))
        }
      </TextField>
      <TextField
        multiline
        value={content}
        onChange={handleContent}
        label="Contenu de l'événement"
        classes={{ root: 'textarea' }}
      />
      <div className="buttons">
        <div className="button-cancel">
          <Button onClick={close}>
            Annuler
          </Button>
        </div>
        <div className="button-save">
          <Button variant="contained" onClick={save}>
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FormEvent;