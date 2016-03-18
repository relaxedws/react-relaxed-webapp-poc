import React from 'react'
import { connect } from 'react-redux'
import { redux as rdr } from 'react-drupal-relaxed'

const mapStateToProps = (state) => ({
  allDBsResult: state.database.allDBsResult,
  databaseName: state.database.configuration && state.database.configuration.databaseName
})

export class SettingsView extends React.Component {
  static propTypes = {
    allDBsResult: React.PropTypes.array,
    databaseName: React.PropTypes.string.isRequired,
    getAllDBs: React.PropTypes.func.isRequired,
    setConfiguration: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.changeDatabaseAction = this.changeDatabase.bind(this)
    this.commitDatabaseChangeAction = this.commitDatabaseChange.bind(this)
  }

  /**
   * Event handler for changing database value.
   */
  changeDatabase (event) {
    this.setState({
      selectedDatabase: event.target.value
    })
  }

  /**
   * Commit the database change, reloading the application.
   */
  commitDatabaseChange (event) {
    event.preventDefault()

    this.props.setConfiguration({
      databaseName: this.state.selectedDatabase
    })
  }

  componentWillMount () {
    // Initially, the selected database is the current one.
    this.setState({
      selectedDatabase: this.props.databaseName
    })

    this.props.getAllDBs()
  }

  render () {
    // Filter away any databases whose name starts with _, since they're
    // usually metadata, and not useful content.
    const options = this.props.allDBsResult.filter((databaseName) => {
      return !databaseName.startsWith('_')
    })

    let databaseSwitchConfirmation = ''

    // Show a confirmation message, if the user changes the database
    // value, since doing so is sorta dangerous.
    if (this.state.selectedDatabase !== this.props.databaseName) {
      databaseSwitchConfirmation = (
        <div className='warning-notice'>
          <h4>Warning</h4>
          <p>
            Changing database will require re-synchronisation of the
            content database. If you do this without having an internet
            connection, you will not be able to continue using this page
            until you the content can be downloaded from the internet.
          </p>
          <button className='database-switcher' name='switch-databases' onClick={this.commitDatabaseChangeAction}>
            Change database
          </button>
        </div>
      )
    }

    return (
      <form action=''>
        <h1>Application settings</h1>

        <select onChange={this.changeDatabaseAction} value={this.state.selectedDatabase}>
          {options.map((value) => {
            return <option key={value} value={value}>{value}</option>
          })}
        </select>
        {databaseSwitchConfirmation}
      </form>
    )
  }
}

export default connect(mapStateToProps, rdr.database.actions)(SettingsView)
