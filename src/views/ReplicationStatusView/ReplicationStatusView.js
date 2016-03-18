import React from 'react'
import { EntityTitleList } from 'components/EntityTitleList'
import { connect } from 'react-redux'
import { redux as rdr } from 'react-drupal-relaxed'

const mapStateToProps = (state) => ({
  allDocsResult: state.database.allDocsResult,
  replicationLastSeq: state.database.replication_last_seq
})

export class ReplicationStatusView extends React.Component {
  static propTypes = {
    allDocsResult: React.PropTypes.object,
    getAllDocs: React.PropTypes.func.isRequired,
    replicationLastSeq: React.PropTypes.number
  };

  componentWillMount () {
    if (!this.props.allDocsResult) {
      this.props.getAllDocs()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.replicationLastSeq !== nextProps.replicationLastSeq) {
      this.props.getAllDocs()
    }
  }

  processDocs (result) {
    let docs = []

    if (result && result.rows) {
      result.rows.forEach((row) => {
        docs.push(row.doc)
      })
    }

    return docs
  }

  render () {
    let docs = this.processDocs(this.props.allDocsResult)

    return (
      <div>
        <h1>Replication status</h1>
        <EntityTitleList entities={docs} />
      </div>
    )
  }
}

export default connect(mapStateToProps, rdr.database.actions)(ReplicationStatusView)
