import React, { PropTypes } from 'react'
import classes from './PageHeader.scss'
import { components } from 'react-drupal-relaxed'
import { Link } from 'react-router'

const DrupalMenu = components.DrupalMenu

function PageHeader ({ menuItems }) {
  return (
    <header className={classes['page-header']}>
      <Link className={classes['identity']} to='/'>
        <img alt='Drugpal Pharmaceuticals' src='/drugpal-logo.svg' />
        <span className={classes['name']}>Drugpal Pharmaceuticals</span>
      </Link>
      <DrupalMenu className='main-menu menu-level-1' items={menuItems} level='1' />
    </header>
  )
}

PageHeader.propTypes = {
  menuItems: PropTypes.array.isRequired
}

export default PageHeader
