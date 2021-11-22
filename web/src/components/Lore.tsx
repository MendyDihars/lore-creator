import React from 'react';
import type { Lore as LoreEntity } from '../types/lore';

interface Props {
  lore: LoreEntity;
}

const Lore = (props: Props) => {
  const { lore } = props;
  return (
    <div className="lore" style={ { background: `url('${lore.image}') center no-repeat` } }>
      <span>
        {lore.name}
      </span>
    </div>
  )
}

export default Lore;