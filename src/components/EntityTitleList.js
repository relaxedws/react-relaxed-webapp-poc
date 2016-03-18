import React from 'react'
import { EntityTitleListItem } from './EntityTitleListItem'

export class EntityTitleList extends React.Component {
  static propTypes = {
    entities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  };

  render () {
    return (
      <ul className='entity-title-list'>
        {this.props.entities.map(function (entity, i) {
          return <EntityTitleListItem entity={entity} key={entity._id} />
        })}
      </ul>
    )
  }
}
