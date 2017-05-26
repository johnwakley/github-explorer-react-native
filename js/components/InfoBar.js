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

import React, {Component, Element} from 'react'
import {Text, ActivityIndicator, Animated} from 'react-native'

const BAR_HEIGHT = 40
const BAR_ORIGIN = 0 - BAR_HEIGHT
const BAR_TOP = 0
const VISIBLE_DURATION = 3000

type DefaultProps = {
  withActivityIndicator?: boolean,
  autoHide?: boolean,
  error?: boolean
}

type Props = {
  children?: Element<any>
}

type State = {
  visible: boolean
}

export default class InfoBar extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    withActivityIndicator: false,
    autoHide: false,
    error: false
  }

  state = {visible: true}

  currentTop = new Animated.Value(BAR_ORIGIN)

  componentDidMount () {
    this.animateTo(VISIBLE_DURATION, BAR_TOP)
  }

  componentWillUpdate () {
    this.currentTop = new Animated.Value(BAR_TOP)
    this.animateTo(VISIBLE_DURATION, BAR_ORIGIN)
  }

  animateDidFinish = () => {
    if (this.state.visible && this.props.autoHide) {
      this.setState({visible: false})
    }
  }

  animateTo = (duration: number, value: number) => {
    Animated.sequence([
      Animated.timing(this.currentTop, {
        toValue: value
      }),
      Animated.delay(duration)
    ]).start(() => this.animateDidFinish())
  }

  render () {
    const backgroundColor = this.props.error ? 'red' : 'white'
    const textColor = this.props.error ? 'white' : 'grey'

    const containerStyles = {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'absolute',
      top: this.currentTop,
      width: '100%',
      height: BAR_HEIGHT,
      padding: 10,
      backgroundColor
    }

    return (
      <Animated.View style={containerStyles}>
        {this.props.withActivityIndicator &&
          <ActivityIndicator style={{marginRight: 10}} animating />}
        <Text style={{textAlign: 'center', color: textColor}}>
          {this.props.children}
        </Text>
      </Animated.View>
    )
  }
}
