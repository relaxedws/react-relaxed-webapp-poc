import React from 'react'
import classes from './PageFooter.scss'
import { Link } from 'react-router'

function PageFooter () {
  return (
    <footer className={classes['page-footer']}>
      <Link to='/replication-status' activeClassName='active'>Replication status</Link>
      <Link to='/settings' activeClassName='active'>Settings</Link>
    </footer>
  )
}

export default PageFooter
