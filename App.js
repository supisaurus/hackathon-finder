import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React, {Component} from 'react';
import { HomeScreen, HackathonScreen } from './src/AppScreens';
//import { HomeDemoScreen, HackathonDemoScreen } from './src/AppDemoScreens';
import { AuthLoadingScreen, SignInScreen, ForgotPasswordScreen, SignUpScreen } from './src/AuthScreens';
import { theme } from './src/Theme';
import { ThemeProvider } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return <AppContainer />
  };
}

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Hackathon: HackathonScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
/*
const AppDemoStack = createStackNavigator(
  {
    HomeDemo: HomeDemoScreen,
    HackathonDemo: HackathonDemoScreen,
  },
  {
    initialRouteName: 'HomeDemo',
  }
);
*/
const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    //SignUp: SignUpScreen,
    //ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: 'SignIn',
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack, //logged in users
  //  AppDemo: AppDemoStack, //anonymous users
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(AppNavigator);
