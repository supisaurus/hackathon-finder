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
  Divider
} from 'react-native-elements';
import { theme, FlexContainer, FlexItem } from './Theme'
import LinearGradient from 'react-native-linear-gradient';

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
    headerMode: 'screen',
    headerVisible: false,
    headerBackTitle: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexLogo.style}>
            <Text style={theme.Logo.style}>Hackathon Finder</Text>
          </View>
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
          <View style={theme.FlexContainerHorizontal.style}>
            <View style={theme.FlexItemHorizontal.style}>
              <Button
                title="Forgot password?"
                onPress={() => navigate('ForgotPassword', {})}
              />
            </View>
            <View style={theme.FlexItemHorizontal.style}>
              <Button
                title="Sign up"
                onPress={() => navigate('SignUp', {})}
              />
            </View>
          </View>
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

export class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'screen',
    headerVisible: false,
    headerBackTitle: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItem.style}>
            <Input
              placeholder='Name'
              leftIcon={{ type: 'font-awesome', name: 'id-badge' }}
            />
            <Input
              placeholder='Email'
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            />
            <Input
              placeholder='Password'
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
            />
            <Input
              placeholder='Confirm Password'
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
            />
            <Button
              title="Sign up!"
              onPress={() => navigate('SignIn', {})}
            />
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }
}

export class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'screen',
    headerVisible: false,
    headerBackTitle: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItem.style}>
            <Input
              placeholder='Email'
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            />
            <Button
              title="Remind me"
              onPress={() => navigate('SignIn', {})}
            />
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }
}
