import 'react-native'
import React from 'react'
import InfoBar from '../InfoBar'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('InfoBar renders with props', () => {
  const tree = renderer
    .create(<InfoBar withActivityIndicator autoHide error />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('InfoBar renders with default props', () => {
  const tree = renderer.create(<InfoBar />).toJSON()
  expect(tree).toMatchSnapshot()
})
