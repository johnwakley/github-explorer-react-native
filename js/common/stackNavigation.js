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

import React from 'react'
import {TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {StackNavigator} from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from './colors'
import TrendingView from '../TrendingView'
import MostStarredView from '../MostStarredView'
import RepoDetailView from '../RepoDetailView'

const styles = StyleSheet.create({
  hamburgerButton: {
    marginLeft: 14
  }
})

function stackNavigationOptions () {
  return ({navigation}: {navigation: any}) => ({
    headerStyle: {backgroundColor: colors.primary},
    headerTintColor: colors.textOnPrimary,
    ...Platform.select({
      android: {
        headerLeft: (
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={() => navigation.navigate('DrawerOpen')}
            accessibilityLabel='menu'
          >
            <MaterialIcons
              name='menu'
              size={24}
              style={{color: colors.textOnPrimary}}
            />
          </TouchableOpacity>
        )
      }
    })
  })
}

export const TrendingStackView = StackNavigator({
  Trending: {
    screen: TrendingView,
    navigationOptions: stackNavigationOptions()
  },
  RepoDetail: {
    screen: RepoDetailView,
    navigationOptions: stackNavigationOptions()
  }
})

export const MostStarredStackView = StackNavigator({
  MostStarred: {
    screen: MostStarredView,
    navigationOptions: stackNavigationOptions()
  },
  RepoDetail: {
    screen: RepoDetailView,
    navigationOptions: stackNavigationOptions()
  }
})
