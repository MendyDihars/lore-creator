import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import type { Lore } from '../types/lore';
import LoreAction from '../actions/lore-action';

interface Props {
  dispatch?: Dispatch,
  lores?: Lore[]
}

class Home extends Component<Props, {}> {
  private _loreAction = new LoreAction();

  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(this._loreAction.fetch() as any);
  } 
  

  render() {
    const { lores } = this.props;
    return (
      <ul>
        {lores.map(lore => (
          <li key={lore.name.toLowerCase().replace(/\s/, '_')}>
            {lore.name}
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return { lores: state.lores?.lores }
};

export default connect(mapStateToProps)(Home);