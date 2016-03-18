import React from 'react'
import get from 'lodash.get'
import { DrupalNodeArticle } from 'components/DrupalNodeArticle/DrupalNodeArticle'
import { DrupalNodeIndication } from 'components/DrupalNodeIndication/DrupalNodeIndication'
import { DrupalNodePage } from 'components/DrupalNodePage/DrupalNodePage'
import { connect } from 'react-redux'
import { redux as rdr } from 'react-drupal-relaxed'

const mapStateToProps = (state) => ({
  results: state.database.getDocResults
})

export class EntityView extends React.Component {
  static propTypes = {
    getDoc: React.PropTypes.func.isRequired,
    results: React.PropTypes.object,
    params: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    const entityId = this.props.params.entityId
    const entity = get(this.props, ['results', entityId])

    if (!entity) {
      this.props.getDoc(entityId)
    }
  }

  render () {
    const entityId = this.props.params.entityId
    const entity = get(this.props, ['results', entityId])
    const entityType = get(entity, '@type')

    // Dispatch to type-specific renderers.
    if (!entity || !entity._id) {
      return <div className='status-loading'>Loading…</div>
    }
    else if (entityType === 'node') {
      let nodeType = get(entity, 'type.0.target_id')

      if (nodeType === 'article') {
        return <DrupalNodeArticle entity={entity} />
      } else if (nodeType === 'indication') {
        return <DrupalNodeIndication entity={entity} />
      } else if (nodeType === 'page') {
        return <DrupalNodePage entity={entity} />
      } else {
        return <div className='error-message'>No entity renderer available for node of type <em>{nodeType}</em>.</div>
      }
    } else {
      // Ideally, we should have a plugin mechanism, so we can find
      // components to render entities defined elsewhere.
      return <div className='error-message'>No entity renderer available for entity of type <em>{entityType}</em>.</div>
    }

  }
}

export default connect(mapStateToProps, rdr.database.actions)(EntityView)
