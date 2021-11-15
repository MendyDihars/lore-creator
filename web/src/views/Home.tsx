import React, { Component } from 'react';
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
  
  public render() {
    const { lores } = this.props;
    return (
      <section className="home">
        <ul className="home-content">
          {lores.map(lore => (
            <Lore key={this._decorator.toKey(lore)} lore={lore}/>
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