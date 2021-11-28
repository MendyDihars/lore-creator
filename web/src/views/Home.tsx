import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';
import { fetch, select } from '../actions/lore-action';
import { toKey } from '../decorator';
import Lore from '../components/Lore';
import type { Lore as LoreEntity } from '../types/lore';

interface Props {
  dispatch?: Dispatch
}

const Home = (props: Props) => {
  const dispatch: Dispatch = useDispatch();
  const lores: LoreEntity[] = useSelector(state => state.lores?.lores);

  const goToDashboard = (lore: LoreEntity) => (): void => {
    sessionStorage.setItem('lore', lore.id);
    dispatch(select(lore));
  }

  useEffect(() => {
    dispatch(fetch() as any);
  }, [])

  return (
    <section className="home">
      <h1 className="home-title flexcenter">
        <span>Lore Creator</span>
      </h1>
      <ul className="home-content">
        {lores.map((lore: LoreEntity) => (
          <Link to="/dashboard" key={toKey(lore)} onClick={goToDashboard(lore)}>
            <Lore lore={lore}/>
          </Link>
        ))}
      </ul>
    </section>
  )
}

export default Home;