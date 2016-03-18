import React from 'react'
import { components } from 'react-drupal-relaxed'

const DrupalFieldEntityReference = components.DrupalFieldEntityReference
const DrupalFieldText = components.DrupalFieldText
const DrupalFieldTitle = components.DrupalFieldTitle

export class DrupalNodeArticle extends React.Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired
  };

  render () {
    const entity = this.props.entity

    return (
      <div className='node node-type-article'>
        <DrupalFieldTitle name='title' field={entity.title} entity={entity} />

        <DrupalFieldEntityReference label='Indication' name='indication'
          field={entity.field_indication_ref} entity={entity} />

        <DrupalFieldEntityReference label='Specialty' name='specialty'
          field={entity.field_specialty_ref} entity={entity} />

        <DrupalFieldText name='body' field={entity.body} entity={entity} />
      </div>
    )
  }
}
