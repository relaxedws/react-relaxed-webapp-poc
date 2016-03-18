import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { redux as rdr } from 'react-drupal-relaxed'

export default combineReducers({
  database: rdr.database.reducers.default,
  router
})
