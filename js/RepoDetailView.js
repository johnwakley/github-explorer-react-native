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
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Linking
} from 'react-native'
import colors from './common/colors'
import {HeroText} from './components/Text'
import Badge from './components/Badge'

export default class RepoDetailView extends Component {
  static navigationOptions = {}

  props: {
    navigation: any
  }

  openRepoUrl (url: string) {
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }

  render () {
    const {repo} = this.props.navigation.state.params
    const avatarUrl = repo.owner.avatarUrl
    const repoLang = repo.primaryLanguage

    return (
      <View style={styles.container}>
        <View style={styles.hero}>
          <HeroText>{repo.name}</HeroText>
          {Boolean(avatarUrl) &&
            <Image style={styles.avatar} source={{uri: avatarUrl}} />}
          <Text>by {repo.owner.login}</Text>
          <View style={styles.badgeRow}>
            {Boolean(repoLang) &&
              <Badge
                iconName='fiber-manual-record'
                iconColor={repoLang.color}
                label={repoLang.name}
              />}
            <Badge
              iconName='star'
              iconColor='grey'
              label={repo.stargazers.totalCount}
            />
            <Badge
              iconName='remove-red-eye'
              iconColor='grey'
              label={repo.watchers.totalCount}
            />
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.scrollView} testID='scrollview' accessibilityLabel='scrollview'>
            <Text style={{marginBottom: 20}}>{repo.description}</Text>
            <Button
              onPress={() => this.openRepoUrl(repo.url)}
              title='View Repo on GitHub'
              color={colors.primary}
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}

RepoDetailView.navigationOptions = ({navigation}) => ({
  headerTitle: `${navigation.state.params.repo.name}`
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  hero: {
    height: 200,
    backgroundColor: 'lightgrey',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 10
  },
  badgeRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  body: {
    flex: 1,
    margin: 20
  },
  scrollView: {
    flex: 1
  }
})
