import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { EntityTitleList } from 'components/EntityTitleList'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<EntityTitleList {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<EntityTitleList {...props} />)
}

describe('(Component) EntityTitleList', function () {
  let _component, _rendered, _props

  beforeEach(function () {
    _props = {
      entities: [
        {
          _id: 'banjo',
          name: [
            {
              value: 'Banjo'
            }
          ]
        }, {
          _id: 'ottavino',
          title: [
            {
              value: 'Ottavino'
            }
          ]
        },
        {
          _id: 'ukulele',
          name: [
            {
              value: 'Ukulele'
            }
          ]
        }
      ]
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <ul>.', function () {
    expect(_component.type).to.equal('ul')
  })

  it('Should have three children.', function () {
    const children = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'li')

    expect(children.length).to.equal(3)
  })
})
