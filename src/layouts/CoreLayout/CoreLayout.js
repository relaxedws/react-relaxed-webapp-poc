import PageFooter from 'components/PageFooter/PageFooter'
import PageHeader from 'components/PageHeader/PageHeader'
import React from 'react'
import classes from './CoreLayout.scss'
import { connect } from 'react-redux'
import { redux as rdr } from 'react-drupal-relaxed'

// Importing core stylesheet to make WebPack load it. Since it has
// :global declarations in it, WebPack will handle the test.
import '../../styles/core.scss'

const mapStateToProps = (state) => ({
  allDocsResult: state.database.allDocsResult
})

export class CoreLayout extends React.Component {
  static propTypes = {
    allDocsResult: React.PropTypes.object,
    children: React.PropTypes.element,
    getAllDocs: React.PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.getAllDocs()
  }

  processMenuItems (result, level) {
    if (result && result.rows) {
      return result.rows.filter((row) => {
        return (row.doc['@type'] === 'menu_link_content')
      })
    } else {
      return []
    }
  }

  render () {
    const firstLevelMenuItems = this.processMenuItems(this.props.allDocsResult, 1)

    return (
      <div className={classes['page-container']}>
        <PageHeader menuItems={firstLevelMenuItems} />
        <main className={classes['main-container']}>
          {this.props.children}
        </main>
        <PageFooter />
      </div>
    )
  }
}

export default connect(mapStateToProps, rdr.database.actions)(CoreLayout)
