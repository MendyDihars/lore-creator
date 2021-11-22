import React, { useState } from 'react';
import { TextField, Fade } from '@mui/material';
import { Visibility } from '@mui/icons-material';

interface Props {
  url?: string;
  label: string;
  onChange?: any;
};

const ImageField = (props: Props) => {
  const { url, label, onChange } = props;
  const [isHover, setIsHover] = useState(false);

  const setHover = (hover: boolean) => () => {
    setIsHover(hover);
  }

  return (
    <div className="image-wrapper">
      <TextField classes={{ root: "input" }} label={label} value={url || ''} onChange={onChange} />
      {
        url && (
          <>
            <div className="icon" onMouseEnter={setHover(true)} onMouseLeave={setHover(false)}>
              <Visibility />
              <Fade in={isHover}>
                <img className="img" src={url} alt={label} />
              </Fade>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ImageField;