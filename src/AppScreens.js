import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { theme } from './Theme'
import AsyncStorage from '@react-native-community/async-storage';


export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <Button
          title="Log out"
          onPress={this._signOutAsync}
        />
      </ThemeProvider>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export class HackathonScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <Button
          title="TODO"
          onPress={() => navigate('Home', {title: 'Jane'})}
        />
      </ThemeProvider>
    );
  }
}
