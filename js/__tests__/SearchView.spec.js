import 'react-native'
import React from 'react'
import {SearchView} from '../SearchView'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/*eslint-disable */
const trendingRepos = JSON.parse(
  `{
	"pageInfo": {
		"hasNextPage": true,
		"endCursor": "Y3Vyc29yOjEw"
	},
	"edges": [{
		"node": {
			"id": "MDEwOlJlcG9zaXRvcnk5MDc4NjI0Ng==",
			"name": "TypeScript-React-Starter",
			"description": "A starter template for TypeScript and React with a detailed README describing how to use the two together.",
			"url": "https://github.com/Microsoft/TypeScript-React-Starter",
			"stargazers": {
				"totalCount": 1318
			}
		}
	}, {
		"node": {
			"id": "MDEwOlJlcG9zaXRvcnk5MDk1Mzg4Nw==",
			"name": "SpreadsheetView",
			"description": "Full configurable spreadsheet view user interfaces for iOS applications. With this framework, you can easily create complex layouts like schedule, gantt chart or timetable as if you are using Excel.",
			"url": "https://github.com/kishikawakatsumi/SpreadsheetView",
			"stargazers": {
				"totalCount": 1099
			}
		}
	}]
}`
)
/*eslint-enable */

const fixture = {search: trendingRepos}

it('SearchView renders correctly', () => {
  const tree = renderer.create(<SearchView viewer={fixture} />).toJSON()
  expect(tree).toMatchSnapshot()
})
