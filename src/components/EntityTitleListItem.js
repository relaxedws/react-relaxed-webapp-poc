import React from 'react'
import { DrupalEntityName } from './DrupalEntityName'
import { Link } from 'react-router'

export class EntityTitleListItem extends React.Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <li>
        <Link to={'/entity/' + this.props.entity._id}>
          <DrupalEntityName entity={this.props.entity} />
        </Link>
      </li>
    )
  }
}
