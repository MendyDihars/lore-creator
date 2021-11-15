import React, { Component } from 'react';
import type { Lore as LoreEntity } from '../types/lore';

interface Props {
  lore: LoreEntity;
}

class Lore extends Component<Props, {}> {
  render() {
    const { lore } = this.props;
    return (
      <div className="lore" style={ { background: `url('${lore.image}') center no-repeat` } }>
        <span>
          {lore.name}
        </span>
      </div>
    )
  }
}

export default Lore;