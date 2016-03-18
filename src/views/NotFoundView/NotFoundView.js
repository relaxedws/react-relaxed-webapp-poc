import React from 'react'

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='error-view error-404'>
        <h1>404 Not Found</h1>

        <p>The page you requested could not be found.</p>
      </div>
    )
  }
}

export default NotFoundView
