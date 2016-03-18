import PouchDB from 'pouchdb'

PouchDB.plugin(require('pouchdb-authentication'))

// Initial state for a bunch of internal variables, so we can easily
// reset them.
const defaultState = {
  authentication: false,
  authenticationCompleted: false,
  localDB: undefined,
  remoteDB: undefined,
  initialReplicationPromises: [],
  replicationStarted: false
}

export default class DatabaseWrapper {
  constructor () {
    // Pre-defined keys for the config object, no values.
    this.config = {
      databaseName: null,
      live: false,
      serverURL: null,
      userName: null,
      userPass: null
    }

    // Init state variables.
    this.state = { ...defaultState }
  }

  allDBs () {
    return new Promise((resolve, reject) => {
      const httpRequest = new XMLHttpRequest()

      httpRequest.open('GET', this.config.serverURL + '_all_dbs', true)
      httpRequest.send(null)

      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            resolve(JSON.parse(httpRequest.responseText))
          } else {
            reject(new Error('HTTP ' + httpRequest.status + ' in DatabaseWrapper.allDBs: ' + httpRequest.responseText))
          }
        }
      }
    })
  }

  allDocs () {
    return this.state.localDB.allDocs({
      include_docs: true
    })
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (this.state.authentication && !this.state.authenticationCompleted) {
        this.state.remoteDB.login(this.config.userName, this.config.userPass, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            this.state.authenticationCompleted = true
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  }

  get (entityId) {
    return this.state.localDB.get(entityId)
  }

  replicate () {
    // Start replication from server.
    if (!this.state.replicationStarted) {
      this.state.replicationStarted = true

      let replication = this.state.localDB.replicate.from(this.state.remoteDB, {
        live: this.config.live,
        retry: this.config.live
      })

      replication.on('denied', function (info) {
        // a document failed to replicate, e.g. due to permissions
        console.error('Replication denied', info)
      })

      replication.on('error', function (err) {
        console.error('Replication error', err)
      })

      return replication
    }
  }

  setConfiguration (newConfig) {
    // Keep track of which config settings changed.
    let keysChanged = []

    // Merge in provided settings.
    Object.keys(newConfig).forEach((key) => {
      // Only allow changes to existing keys, and check that the value
      // actually changed.
      if (this.config[key] !== undefined && this.config[key] !== newConfig[key]) {
        keysChanged.push(key)

        this.config[key] = newConfig[key]
      }
    })

    // If the configuration changed, reset our state and make new
    // database connections.
    if (keysChanged.length > 0) {
      // If we already have a local database set, and we are changing
      // databases, destroy the previous local copy to preserve storage
      // space, and access control.
      if (this.state.localDB && this.state.localDB.destroy) {
        this.state.localDB.destroy()
      }

      // Reset state variables.
      this.state = { ...defaultState }

      // Determine if we should do authentication.
      this.state.authentication = !!this.config.userName

      this.state.localDB = new PouchDB(this.config.databaseName)
      this.state.remoteDB = new PouchDB([this.config.serverURL, this.config.databaseName].join('/'), {skipSetup: true})
    }
  }
}
