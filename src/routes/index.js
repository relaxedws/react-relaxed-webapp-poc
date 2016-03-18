import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import EntityView from 'views/EntityView/EntityView'
import HomeView from 'views/HomeView/HomeView'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import ReplicationStatusView from 'views/ReplicationStatusView/ReplicationStatusView'
import SettingsView from 'views/SettingsView/SettingsView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />

    <Route path='/entity/:entityId' component={EntityView}/>
    <Route path='/replication-status' component={ReplicationStatusView} />
    <Route path='/settings' component={SettingsView} />

    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
)
