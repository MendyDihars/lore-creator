import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../store';
import { Button, TextField, Typography, MenuItem } from '@mui/material';
import { fetch, create } from '../../actions/period-action';
import type { Period } from '../../types/period';

interface Props {
  loreId: string;
  period?: Period;
  onClose: any;
}

const FormPeriod = (props: Props) => {
  const { period, onClose, loreId } = props;
  const periods: Period[] = useSelector(state => state.periods?.periods);
  const dispatch: Dispatch = useDispatch();
  const [name, setName] = useState('');
  const [position, setPosition] = useState(1);

  const createList = () => {
    if (!periods.length) {
      return [{ position: 1, name: 'Au début' }];
    } else {
      return [
        ...periods.map(p => ({ name: `Avant : ${p.name}`, position: p.position })),
        { name: 'A la fin', position: (periods.length + 1) }
      ]
    }
  }

  const listPeriods = createList();

  useEffect(() => {
    if (!periods.length) {
      dispatch(fetch(loreId) as any);
    }
    if (period) {
      setName(period.name);
      setPosition(period.position);
    }
  }, [])

  const handleName = (event) => {
    setName(event?.target?.value);
  }

  const handlePosition = (p: number) => () => {
    setPosition(p);
  }

  const close = e => {
    setName('');
    setPosition(1);
    onClose(e);
  }

  const save = e => {
    if (!period) {
      dispatch(create({ period: { name, position }, loreId }) as any);
    }
    close(e);
  }

  return (
    <div className="group-inputs overflow">
      <Typography classes={{ root: 'textcenter' }} variant="h4">
        {!!period ? 'Editer une période' : 'Créer une période'}
      </Typography>
      <TextField classes={{ root: "input" }} required label="Nom" value={name} onChange={handleName} />
      <TextField
        select
        value={position}
        label="Ou se situe la période"
      >
        {
          listPeriods.map((p: Period, index: number) =>
            <MenuItem key={p.name.replace(/\s/g, '_').toLowerCase() + "_" + index} onClick={handlePosition(p.position)} value={p.position}>{p.name}</MenuItem>
          )
        }
      </TextField>
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

FormPeriod.defaultProps = {
  period: null
}

export default FormPeriod;