import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import type { Lore as LoreEntity } from '../types/lore';
import { fetch, select } from '../actions/lore-action';
import { toKey } from '../decorator';
import Lore from '../components/Lore';

interface Props {
  dispatch?: Dispatch,
  lores?: LoreEntity[]
}

const Home = (props: Props) => {
  const dispatch: Dispatch = useDispatch();
  const lores: LoreEntity[] = useSelector((state: any) => state.lores?.lores);

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