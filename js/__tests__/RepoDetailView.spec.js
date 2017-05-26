import 'react-native'
import React from 'react'
import RepoDetailView from '../RepoDetailView'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/*eslint-disable */
const repo = JSON.parse(
  `
{
  "repo": {
    "id": "MDEwOlJlcG9zaXRvcnkyMTI2MjQ0",
    "name": "bootstrap",
    "description": "The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.",
    "url": "https://github.com/twbs/bootstrap",
    "homepageUrl": "http://getbootstrap.com",
    "license": "MIT License",
    "owner": {
      "avatarUrl": "https://avatars3.githubusercontent.com/u/2918581?v=3",
      "login": "twbs"
    },
    "stargazers": {
      "totalCount": 110759
    },
    "watchers": {
      "totalCount": 6939
    },
    "primaryLanguage": {
      "color": "#f1e05a",
      "name": "JavaScript"
    }
  }
}
`
)
/*eslint-enable */

const fixture = {
  state: {
    params: repo
  }
}

it('RepoDetailView renders correctly', () => {
  const tree = renderer.create(<RepoDetailView navigation={fixture} />).toJSON()
  expect(tree).toMatchSnapshot()
})
