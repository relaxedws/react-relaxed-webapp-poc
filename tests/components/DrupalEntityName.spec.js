import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { DrupalEntityName } from 'components/DrupalEntityName'
import { shallow } from 'enzyme'

describe('(Component) DrupalEntityName with no title', function () {
  let _component, _rendered, _props

  beforeEach(function () {
    _props = {
      entity: {}
    }

    _component = shallow(<DrupalEntityName {..._props} />)
  })

  it('Should render as a <span>.', function () {
    expect(_component.type()).to.equal('span')
  })

  it('Should contain the string "No title".', function () {
    const span = _component.find('span')

    expect(span).to.exist
    expect(span.text()).to.match(/No title/)
  })
})

describe('(Component) DrupalEntityName with title from name field', function () {
  let _component, _rendered, _props

  beforeEach(function () {
    _props = {
      entity: {
        name: [
          {
            value: 'Jupiter'
          }
        ]
      }
    }

    _component = shallow(<DrupalEntityName {..._props} />)
  })

  it('Should render as a <li>.', function () {
    expect(_component.type()).to.equal('span')
  })

  it('Should contain the entity name.', function () {
    const span = _component.find('span')

    expect(span).to.exist
    expect(span.text()).to.match(/Jupiter/)
  })
})
