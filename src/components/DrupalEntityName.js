import React from 'react'

export class DrupalEntityName extends React.Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired
  };

  render () {
    let entity = this.props.entity
    var name

    if (entity.name && entity.name[0] && entity.name[0].value) {
      name = entity.name[0].value
    } else if (entity.title && entity.title[0] && entity.title[0].value) {
      name = entity.title[0].value
    } else {
      name = 'No title'
    }

    return <span>{name}</span>
  }
}
