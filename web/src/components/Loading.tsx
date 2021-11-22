import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props: {}) => {
  return (
    <div className="background flexcenter">
      <CircularProgress size={80} />
    </div>
  )
}

export default Loading;