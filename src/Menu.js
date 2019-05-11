import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { FlatList, Modal, Text, View, Alert, TouchableHighlight, DeviceEventEmitter  } from "react-native";
//import { ListItem, Text, Left, Body, View } from "native-base";
import { Icon, Overlay, ThemeProvider, Divider, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { theme, NotificationIcon } from './Theme'
import { _getRegistrations, _isRegistered } from './HelperFuncs'

export class AppMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <View style={theme.HeaderMenu.style}>
        <TouchableHighlight onPress={() => this._setVisible(true)}>
          <NotificationIcon name='bars' type='font-awesome' color='black' menu={true}/>
        </TouchableHighlight>
        </View>
        {this._renderOverlay()}
      </View>

    );
  }

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };

  _setVisible(visible) {
    this.setState({isVisible: visible});
  }

  _renderOverlay() {
    const { isVisible } = this.state;
    if (isVisible) {
      return (
        <ThemeProvider theme={theme}>
        <Overlay
            isVisible={true}
            onBackdropPress={() => this._setVisible(false)}
        >
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>

        <View style={theme.FlexContainer.style}>

          <View style={theme.FlexItem.style}>
            <Text>Menu WIP!</Text>
          </View>
          <View style={theme.FlexItem.style}>
            <Button
              title="Messages"
              icon={
                <NotificationIcon
                  name='paper-plane'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
            <Button
              title="Registered Hackathons"
              icon={
                <Icon
                  name='folder'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
            <Button
              title="Forum"
              icon={
                <Icon
                  name='comments'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
            <Button
              title="Search"
              icon={
                <Icon
                  name='search'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
            <Button
              title="Settings"
              icon={
                <Icon
                  name='id-card'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
          </View>
          <View style={theme.FlexItem.style}>
            <Divider/>
            <Button
              title="Log out"
              onPress={this._signOutAsync}
            />
          </View>
          <View style={theme.FlexItemLast.style}>
            <Button
              icon={
                <Icon
                  name='arrow-left'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
              onPress={() => this._setVisible(false)}
            />
          </View>
        </View>

        </LinearGradient>
        </Overlay>
        </ThemeProvider>
      );
    }
  }
}

export class HackathonMenu extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isRegistered: false,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('refreshHome', async (e)=>{
      await this.componentDidMount();
    })
  }

  async componentDidMount() {
    this._isMounted = true;
    const asyncdata = await _getRegistrations();
    if (this._isMounted) {
      this.setState({ isRegistered: _isRegistered(this.props.id, asyncdata) });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {navigate} = this.props.navigation;
    const {id} = this.props.id;

    return (
      <View>
        {this._renderTouchable()}
        {this._renderOverlay()}
      </View>

    );
  }

  _renderTouchable() {
    if (this.state.isRegistered) {
      return (
        <View style={theme.HeaderMenu.style}>
        <TouchableHighlight onPress={() => this._setVisible(true)}>
          <NotificationIcon name='wrench' type='font-awesome' color='black' menu={true}/>
        </TouchableHighlight>
        </View>
      );
    }
    else {
      return (
        <View style={theme.HeaderMenu.style}></View>
      );
    }
  }

  _setVisible(visible) {
    if (this._isMounted) {
      this.setState({isVisible: visible});
    }
  }

  _renderOverlay() {
    const { isVisible } = this.state;
    if (isVisible) {
      return (
        <ThemeProvider theme={theme}>
        <Overlay
            isVisible={true}
            onBackdropPress={() => this._setVisible(false)}
        >
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>

        <View style={theme.FlexContainer.style}>

          <View style={theme.FlexItem.style}>
            <Text>Menu WIP!</Text>
          </View>
          <View style={theme.FlexItem.style}>
            <Button
              title="Participants"
              icon={
                <Icon
                  name='users'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
            <Button
              title="Hackathon Forum"
              icon={
                <NotificationIcon
                  name='comments'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
            />
          </View>
          <View style={theme.FlexItem.style}>
            <Divider/>
            <Button
              title="Log out"
              onPress={this._signOutAsync}
            />
          </View>
          <View style={theme.FlexItemLast.style}>
            <Button
              icon={
                <Icon
                  name='arrow-left'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
              onPress={() => this._setVisible(false)}
            />
          </View>
        </View>

        </LinearGradient>
        </Overlay>
        </ThemeProvider>
      );
    }
  }
}
