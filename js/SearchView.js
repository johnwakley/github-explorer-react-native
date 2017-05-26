/**
 * MIT License
 *
 * Copyright (c) 2017 johnwakley
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

// @flow

import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import {graphql, QueryRenderer, createPaginationContainer} from 'react-relay'
import hoistStatics from 'hoist-non-react-statics'
import {type SearchViewViewer} from './__generated__/SearchView_viewer.graphql'
import {Repo} from './exports'
import relayEnv from './common/createRelayEnvironment'
import SearchCellView from './components/SearchCellView'
import InfoBar from './components/InfoBar'

const PAGE_SIZE = 20
const FETCH_ERROR_MESSAGE = 'Failed to load repos. Pull to refresh.'

type Props = {
  viewer: SearchViewViewer,
  relay: any,
  navigation: any
}

type State = {
  isFetching: boolean,
  error: string
}

export class SearchView extends Component<void, Props, State> {
  state = {
    isFetching: false,
    error: ''
  }

  onRefresh = () => {
    if (this.props.relay.isLoading()) {
      return
    }

    this.setState({
      isFetching: true
    })

    this.props.relay.refetchConnection(PAGE_SIZE, err => {
      this.setState({
        isFetching: false
      })

      if (err) {
        console.log('Refresh ERROR: ', err)
        this.setState({error: FETCH_ERROR_MESSAGE})
      }
    })
  }

  onEndReached = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return
    }

    this.props.relay.loadMore(PAGE_SIZE, err => {
      if (err) {
        console.log('loadMore ERROR: ', err)
        this.setState({error: FETCH_ERROR_MESSAGE})
      }
    })
  }

  renderItem = ({item}: {item: any}) => {
    const {node} = item
    const primaryLanguage = node.primaryLanguage

    return (
      <SearchCellView
        title={node.name}
        description={node.description}
        language={primaryLanguage && primaryLanguage.name}
        languageColor={primaryLanguage && primaryLanguage.color}
        starCount={node.stargazers.totalCount}
        onPress={() => this.showRepoDetails(node)}
      />
    )
  }

  showRepoDetails = (repo: Repo) => {
    const {navigate} = this.props.navigation
    navigate('RepoDetail', {repo})
  }

  render () {
    const {search} = this.props.viewer

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {Boolean(this.state.error) &&
          <InfoBar error autoHide>{this.state.error}</InfoBar>}
        <FlatList
          testID='repoList'
          accessibilityLabel='repoList'
          data={search.edges}
          renderItem={this.renderItem}
          keyExtractor={item => item.node.id}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.state.isFetching}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#cccccc'}} />
          )}
        />
      </View>
    )
  }
}

const SearchViewPaginationContainer = createPaginationContainer(
  SearchView,
  {
    viewer: graphql`
      fragment SearchView_viewer on Query {
        search (
          first: $count, 
          after: $cursor, 
          query: $query, 
          type: REPOSITORY
        ) @connection(key: "SearchView_search") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
            ... on Repository {
                id,
                name,
                description,
                url,
                homepageUrl,
                license,
                owner {
                  avatarUrl,
                  login
                }
                stargazers {
                  totalCount
                },
                watchers {
                  totalCount
                },
                primaryLanguage {
                  color,
                  name
                }
              }
            }
          }
        }
      } 
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps (props) {
      return props.viewer && props.viewer.search
    },
    getFragmentVariables (prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables (props, {count, cursor}, fragmentVariables) {
      return {
        count,
        cursor,
        query: props.searchQuery
      }
    },
    variables: {cursor: null},
    query: graphql`
        query SearchViewPaginationQuery(
          $count: Int!,
          $cursor: String,
          $query: String!
        ) {
          viewer: relay {
            ...SearchView_viewer
          }
        }
      `
  }
)

const SearchViewQueryRenderer = parentProps => {
  return (
    <QueryRenderer
      environment={relayEnv}
      query={graphql`
          query SearchViewQuery(
            $count: Int!,
            $cursor: String,
            $query: String!
          ) {
            viewer: relay {
              ...SearchView_viewer
            }
          }
        `}
      variables={{
        cursor: null,
        count: PAGE_SIZE,
        query: parentProps.searchQuery
      }}
      render={({error, props}) => {
        if (props) {
          return (
            <SearchViewPaginationContainer
              viewer={props.viewer}
              navigation={parentProps.navigation}
              searchQuery={parentProps.searchQuery}
            />
          )
        } else if (error) {
          return <InfoBar error>{FETCH_ERROR_MESSAGE}</InfoBar>
        } else {
          return <InfoBar withActivityIndicator>Fetching repos</InfoBar>
        }
      }}
    />
  )
}

export default hoistStatics(SearchViewQueryRenderer, SearchView)
