import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import type { Lore } from '../types/lore';
import Loading from '../components/Loading';
import LoreAction from '../actions/lore-action';
import { Button } from '@mui/material';
import Modal from '../components/Modal';
interface Props {
  dispatch: Dispatch
  current: Lore;
  loading: boolean;
}

interface State {
  newEvent: boolean;
}

class Dashboard extends Component<Props, State> {
  private _loreAction = new LoreAction();

  public state: State = {
    newEvent: false
  }

  constructor(props: Props) {
    super(props);
    this.toggleNewEvent = this.toggleNewEvent.bind(this);
  }

  componentDidMount() {
    const { current, dispatch } = this.props;
    if (!current) {
      const id = sessionStorage.getItem('lore')
      if (id) {
        dispatch(this._loreAction.find(id) as any);
      }
    }
  }

  toggleNewEvent(isOpen: boolean) {
    return () => {
      this.setState({ newEvent: isOpen })
    }
  }

  render() {
    const { current, loading } = this.props;
    const { newEvent } = this.state
    return (
      <>
        {loading && <Loading />}
        <div className="dashboard">
          <div className="flexcenter">
            <h1>{current?.name}</h1>
          </div>
          <div className="flexcenter">
            <Button variant="outlined" onClick={this.toggleNewEvent(true)}>
              Nouvel événement
            </Button>
          </div>
          <Modal isOpen={newEvent} toggle={this.toggleNewEvent}>
            Créer un nouvel évènement
          </Modal>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { current, loading } = state.lores;
  return { current, loading };
}

export default connect(mapStateToProps)(Dashboard);