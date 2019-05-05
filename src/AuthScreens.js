import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ThemeProvider,
  Input,
} from 'react-native-elements';
import { theme, FlexContainer, FlexItem, } from './Theme'

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign in',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItem.style}>
            <Input
              placeholder='Email'
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            />
            <Input
              placeholder='Password'
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
            />
            <Button
              title="Log in"
              onPress={this._signInAsync}
            />
          </View>
          <View style={theme.FlexItem.style}>
            <Button
              title="Forgot password?"
              onPress={this._signInAsync}
            />
            <Button
              title="Sign up"
              onPress={this._signInAsync}
            />
          </View>
        </View>
      </ThemeProvider>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}
