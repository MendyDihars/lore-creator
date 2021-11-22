import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Button } from '@mui/material';
import type { Event } from '../../types/event';
import type { Lore } from '../../types/lore';
import ImageField from './ImageField';
import { create } from '../../actions/event-action';

interface Props {
  event?: Event
  onClose: any;
  edition: boolean;
}

const FormEvent = (props: Props) => {
  const { event, edition, onClose } = props;
  const lore: Lore = useSelector((state: any) => state.lores?.lore)
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const close = (e) => {
    onClose(e);
    setName('');
    setImage('');
  }

  const save = (e) => {
    if (!edition && lore) {
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
        {edition ? 'Editer un événement' : 'Créer un événement'}
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

FormEvent.defaultProps = {
  event: null
}


export default FormEvent;