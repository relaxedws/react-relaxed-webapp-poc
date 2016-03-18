import React from 'react'
import { components } from 'react-drupal-relaxed'

const DrupalFieldText = components.DrupalFieldText
const DrupalFieldTitle = components.DrupalFieldTitle

export class DrupalNodeIndication extends React.Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired
  };

  render () {
    const entity = this.props.entity

    return (
      <div className='node node-type-indication'>
        <DrupalFieldTitle name='title' field={entity.title} entity={entity} />

        <DrupalFieldText name='body' field={entity.body} entity={entity} />
      </div>
    )
  }
}

