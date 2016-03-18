import React from 'react'
import { EntityTitleListItem } from 'components/EntityTitleListItem'
import { shallow } from 'enzyme'

describe('(Component) EntityTitleListItem', function () {
  let _component, _props

  beforeEach(function () {
    _props = {
      entity: {
        _id: 'tootlepip'
      }
    }

    _component = shallow(<EntityTitleListItem {..._props} />)
  })

  it('Should render as a <li>.', function () {
    expect(_component.type()).to.equal('li')
  })

  it('Should contain a <DrupalEntityName>.', function () {
    const tag = _component.find('DrupalEntityName')

    expect(tag).to.have.length(1)
  })

  it('Should include a <Link> linking to the entity page.', function () {
    const link = _component.find('Link')

    expect(link).to.have.length(1)
    expect(link.props().to).to.match(/\/entity\/tootlepip$/)
  })
})
