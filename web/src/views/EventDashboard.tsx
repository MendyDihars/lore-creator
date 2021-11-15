import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import type { Lore } from '../types/lore';
import Loading from '../components/Loading';
import LoreAction from '../actions/lore-action';

interface Props {
  dispatch: Dispatch
  current: Lore;
  loading: boolean;
}

class EventDashboard extends Component<Props, {}> {
  private _loreAction = new LoreAction();

  componentDidMount() {
    const { current, dispatch } = this.props;
    if (!current) {
      const id = sessionStorage.getItem('lore')
      if (id) {
        dispatch(this._loreAction.find(id) as any);
      }
    }
  }

  render() {
    const { current, loading } = this.props;
    return (
      <>
        {loading && <Loading />}
        <div className="flexcenter">
          <h1>{current?.name}</h1>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { current, loading } = state.lores;
  return { current, loading };
}

export default connect(mapStateToProps)(EventDashboard);