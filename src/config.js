/**
 * @file
 * Stub file for configuration loading.
 *
 * Currently just holds configuration settings in code, but should
 * eventually be refactored to ingest a config file that can be
 * customised for the environment, without affecting the Git repo
 * history.
 */

export default {
  database: {
    databaseName: 'relaxed',
    // Determines whether to receive live updates from the remote
    // server, by subscribing to its changes feed.
    live: true,
    serverURL: 'http://localhost:5984/',
    userName: 'test',
    userPass: 'test'
  }
}
