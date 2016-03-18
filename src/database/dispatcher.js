import { redux as rdr } from 'react-drupal-relaxed'

/**
 * DatabaseDispatcher
 *
 * Glue class that encapsulates redux interactions with the database.
 */
export default class DatabaseDispatcher {
  constructor (config, store) {
    this.config = config
    this.store = store
  }

  start () {
    // Set configuration for database.
    this.store.dispatch(rdr.database.actions.setConfiguration(this.config))
  }
}
