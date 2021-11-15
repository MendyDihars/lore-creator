import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import type { Lore as LoreEntity } from '../types/lore';
import LoreAction from '../actions/lore-action';
import Decorator from '../decorator';
import Lore from '../components/Lore';

interface Props {
  dispatch?: Dispatch,
  lores?: LoreEntity[]
}

class Home extends Component<Props, {}> {
  private _loreAction = new LoreAction();
  private _decorator = new Decorator();

  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(this._loreAction.fetch() as any);
  }

  private goToDashboard(lore: LoreEntity): () => void {
    const { dispatch } = this.props;
    return (): void => {
      sessionStorage.setItem('lore', lore.id);
      dispatch(this._loreAction.select(lore));
    }
  }
  
  public render() {
    const { lores } = this.props;
    return (
      <section className="home">
        <h1 className="home-title flexcenter">
          <span>Lore Creator</span>
        </h1>
        <ul className="home-content">
          {lores.map((lore: LoreEntity) => (
            <Link to="/dashboard" key={this._decorator.toKey(lore)} onClick={this.goToDashboard(lore)}>
              <Lore lore={lore}/>
            </Link>
          ))}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { lores: state.lores?.lores }
};

export default connect(mapStateToProps)(Home);