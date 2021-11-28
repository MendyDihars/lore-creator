import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { TextField, Typography, Button } from '@mui/material';
import ImageField from './ImageField';
import { create } from '../../actions/event-action';
import type { Event } from '../../types/event';
import type { Lore } from '../../types/lore';

interface Props {
  event?: Event
  onClose: any;
}

const FormEvent = (props: Props) => {
  const { event, onClose } = props;
  const lore: Lore = useSelector(state => state.lores?.lore)
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const close = (e) => {
    onClose(e);
    setName('');
    setImage('');
  }

  const save = (e) => {
    if (!lore) {
      dispatch(create({ id: lore.id, event: { name, image } }) as any);
      close(e);
    }
  }

  const handleName = e => {
    setName(e?.target?.value);
  }

  const handleImage = e => {
    setImage(e?.target?.value);
  }

  useEffect(() => {
    if (event) {
      setName(event.name);
      setImage(event.image)
    }
  })

  return (
    <div className="group-inputs overflow">
      <Typography classes={{ root: 'textcenter' }} variant="h4">
        {!!event ? 'Editer un événement' : 'Créer un événement'}
      </Typography>
      <TextField classes={{ root: "input" }} required label="Nom" value={name} onChange={handleName} />
      <ImageField url={image} label="Image" onChange={handleImage} />
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