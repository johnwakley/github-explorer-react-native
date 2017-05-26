/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule SearchViewQuery.graphql
 * @generated SignedSource<<b588c88a66d38348fe11856ea11213c8>>
 * @relayHash 9d03239985d9f6ab84296f5aeda37864
 * @flow
 * @nogrep
 */

'use strict'

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/

/* eslint-disable comma-dangle, quotes */

/*
query SearchViewQuery(
  $count: Int!
  $cursor: String
  $query: String!
) {
  viewer: relay {
    ...SearchView_viewer
  }
}

fragment SearchView_viewer on Query {
  search(first: $count, after: $cursor, query: $query, type: REPOSITORY) {
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        __typename
        ... on Repository {
          id
          name
          description
          url
          homepageUrl
          license
          owner {
            __typename
            avatarUrl
            login
            id
          }
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
          primaryLanguage {
            color
            name
            id
          }
        }
        ... on Node {
          id
        }
      }
      cursor
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  fragment: {
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int!',
        defaultValue: null
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: null
      },
      {
        kind: 'LocalArgument',
        name: 'query',
        type: 'String!',
        defaultValue: null
      }
    ],
    kind: 'Fragment',
    metadata: null,
    name: 'SearchViewQuery',
    selections: [
      {
        kind: 'LinkedField',
        alias: 'viewer',
        args: null,
        concreteType: 'Query',
        name: 'relay',
        plural: false,
        selections: [
          {
            kind: 'FragmentSpread',
            name: 'SearchView_viewer',
            args: null
          }
        ],
        storageKey: null
      }
    ],
    type: 'Query'
  },
  id: null,
  kind: 'Batch',
  metadata: {},
  name: 'SearchViewQuery',
  query: {
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int!',
        defaultValue: null
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: null
      },
      {
        kind: 'LocalArgument',
        name: 'query',
        type: 'String!',
        defaultValue: null
      }
    ],
    kind: 'Root',
    name: 'SearchViewQuery',
    operation: 'query',
    selections: [
      {
        kind: 'LinkedField',
        alias: 'viewer',
        args: null,
        concreteType: 'Query',
        name: 'relay',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            args: [
              {
                kind: 'Variable',
                name: 'after',
                variableName: 'cursor',
                type: 'String'
              },
              {
                kind: 'Variable',
                name: 'first',
                variableName: 'count',
                type: 'Int'
              },
              {
                kind: 'Variable',
                name: 'query',
                variableName: 'query',
                type: 'String!'
              },
              {
                kind: 'Literal',
                name: 'type',
                value: 'REPOSITORY',
                type: 'SearchType!'
              }
            ],
            concreteType: 'SearchResultItemConnection',
            name: 'search',
            plural: false,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                args: null,
                concreteType: 'PageInfo',
                name: 'pageInfo',
                plural: false,
                selections: [
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'hasNextPage',
                    storageKey: null
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'endCursor',
                    storageKey: null
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'hasPreviousPage',
                    storageKey: null
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'startCursor',
                    storageKey: null
                  }
                ],
                storageKey: null
              },
              {
                kind: 'LinkedField',
                alias: null,
                args: null,
                concreteType: 'SearchResultItemEdge',
                name: 'edges',
                plural: true,
                selections: [
                  {
                    kind: 'LinkedField',
                    alias: null,
                    args: null,
                    concreteType: null,
                    name: 'node',
                    plural: false,
                    selections: [
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: '__typename',
                        storageKey: null
                      },
                      {
                        kind: 'ScalarField',
                        alias: null,
                        args: null,
                        name: 'id',
                        storageKey: null
                      },
                      {
                        kind: 'InlineFragment',
                        type: 'Repository',
                        selections: [
                          {
                            kind: 'ScalarField',
                            alias: null,
                            args: null,
                            name: 'name',
                            storageKey: null
                          },
                          {
                            kind: 'ScalarField',
                            alias: null,
                            args: null,
                            name: 'description',
                            storageKey: null
                          },
                          {
                            kind: 'ScalarField',
                            alias: null,
                            args: null,
                            name: 'url',
                            storageKey: null
                          },
                          {
                            kind: 'ScalarField',
                            alias: null,
                            args: null,
                            name: 'homepageUrl',
                            storageKey: null
                          },
                          {
                            kind: 'ScalarField',
                            alias: null,
                            args: null,
                            name: 'license',
                            storageKey: null
                          },
                          {
                            kind: 'LinkedField',
                            alias: null,
                            args: null,
                            concreteType: null,
                            name: 'owner',
                            plural: false,
                            selections: [
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: '__typename',
                                storageKey: null
                              },
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'avatarUrl',
                                storageKey: null
                              },
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'login',
                                storageKey: null
                              },
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'id',
                                storageKey: null
                              }
                            ],
                            storageKey: null
                          },
                          {
                            kind: 'LinkedField',
                            alias: null,
                            args: null,
                            concreteType: 'StargazerConnection',
                            name: 'stargazers',
                            plural: false,
                            selections: [
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'totalCount',
                                storageKey: null
                              }
                            ],
                            storageKey: null
                          },
                          {
                            kind: 'LinkedField',
                            alias: null,
                            args: null,
                            concreteType: 'UserConnection',
                            name: 'watchers',
                            plural: false,
                            selections: [
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'totalCount',
                                storageKey: null
                              }
                            ],
                            storageKey: null
                          },
                          {
                            kind: 'LinkedField',
                            alias: null,
                            args: null,
                            concreteType: 'Language',
                            name: 'primaryLanguage',
                            plural: false,
                            selections: [
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'color',
                                storageKey: null
                              },
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'name',
                                storageKey: null
                              },
                              {
                                kind: 'ScalarField',
                                alias: null,
                                args: null,
                                name: 'id',
                                storageKey: null
                              }
                            ],
                            storageKey: null
                          }
                        ]
                      }
                    ],
                    storageKey: null
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    args: null,
                    name: 'cursor',
                    storageKey: null
                  }
                ],
                storageKey: null
              }
            ],
            storageKey: null
          },
          {
            kind: 'LinkedHandle',
            alias: null,
            args: [
              {
                kind: 'Variable',
                name: 'after',
                variableName: 'cursor',
                type: 'String'
              },
              {
                kind: 'Variable',
                name: 'first',
                variableName: 'count',
                type: 'Int'
              },
              {
                kind: 'Variable',
                name: 'query',
                variableName: 'query',
                type: 'String!'
              },
              {
                kind: 'Literal',
                name: 'type',
                value: 'REPOSITORY',
                type: 'SearchType!'
              }
            ],
            handle: 'connection',
            name: 'search',
            key: 'SearchView_search',
            filters: ['query', 'type']
          }
        ],
        storageKey: null
      }
    ]
  },
  text: 'query SearchViewQuery(\n  $count: Int!\n  $cursor: String\n  $query: String!\n) {\n  viewer: relay {\n    ...SearchView_viewer\n  }\n}\n\nfragment SearchView_viewer on Query {\n  search(first: $count, after: $cursor, query: $query, type: REPOSITORY) {\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      node {\n        __typename\n        ... on Repository {\n          id\n          name\n          description\n          url\n          homepageUrl\n          license\n          owner {\n            __typename\n            avatarUrl\n            login\n            id\n          }\n          stargazers {\n            totalCount\n          }\n          watchers {\n            totalCount\n          }\n          primaryLanguage {\n            color\n            name\n            id\n          }\n        }\n        ... on Node {\n          id\n        }\n      }\n      cursor\n    }\n  }\n}\n'
}

module.exports = batch