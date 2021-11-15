import React, { Component } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

class Loading extends Component<{}, {}> {
  render() {
    return (
      <div className="background flexcenter">
        <CircularProgress size={80} />
      </div>
    )
  }
}

export default Loading;