import ModalDropdown from 'react-native-modal-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { FlatList, Modal, Text, View, Alert, TouchableHighlight, DeviceEventEmitter  } from "react-native";
//import { ListItem, Text, Left, Body, View } from "native-base";
import { Icon, Overlay, ThemeProvider, Divider, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { theme, NotificationIcon } from './Theme'
import { _getRegistrations, _isRegistered, _isHost } from './HelperFuncs'

export class AppMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isHelpVisible: false,
    };
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <View style={theme.HeaderMenu.style}>
        <TouchableHighlight onPress={() => this._toggleHostMode()} style={{marginRight:20}}>
          <Icon name='wrench' type='font-awesome' color='black'/>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._setHelpVisible(true)} style={{marginRight:20}}>
          <Icon name='question' type='font-awesome' color='black'/>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._setVisible(true)}>
          <NotificationIcon name='bars' type='font-awesome' color='black' menu={true}/>
        </TouchableHighlight>
        </View>
        {this._renderOverlay()}
        {this._renderHelpOverlay()}
      </View>

    );
  }

  _toggleHostMode = async () => {
    let isHost = await _isHost();
    if (isHost) {
      await AsyncStorage.removeItem('isHost');
      this.props.navigation.navigate('Home', {
      });
    }
    else {
      await AsyncStorage.setItem('isHost', JSON.stringify(true));
      this.props.navigation.navigate('Host', {
      });
    }
  };

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };

  _setVisible(visible) {
    this.setState({isVisible: visible});
  }

  _setHelpVisible(visible) {
    this.setState({isHelpVisible: visible});
  }

  _renderHelpOverlay() {
    const { isHelpVisible } = this.state;
    if (isHelpVisible) {
      return (
        <ThemeProvider theme={theme}>
        <Overlay
            isVisible={true}
            onBackdropPress={() => this._setHelpVisible(false)}
        >
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>

        <View style={theme.FlexContainer.style}>

          <View style={theme.FlexItem.style}>
            <Text>
             Hello! This textbox here is supposed to be an introduction to the application, but the developer behind it was too lazy to write any actual content :(
             You can register to Hackathons from their pages and you can search and filter hackathons on the home screen.
            </Text>
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
              onPress={() => this._setHelpVisible(false)}
            />
          </View>
        </View>

        </LinearGradient>
        </Overlay>
        </ThemeProvider>
      );
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
            <Text></Text>
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
              onPress={() => {
                this._setVisible(false);
                this.props.navigation.navigate('MessageCenter', {
                });
              }}
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
              onPress={() => {
                this._setVisible(false);
                this.props.navigation.navigate('GeneralForum', {
                });
              }}
            />
            <Button
              title="Profile"
              icon={
                <Icon
                  name='id-card'
                  type='font-awesome'
                  color='white'
                />
              }
              iconLeft
              onPress={() => {
                this._setVisible(false);
                this.props.navigation.navigate('Profile', {
                });
              }}
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

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };

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
            <Text></Text>
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
              onPress={() => {
                this._setVisible(false);
                this.props.navigation.navigate('HackathonParticipants', {
                  id: this.props.id,
                  data: this.props.data,
                });
              }}
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
              onPress={() => {
                this._setVisible(false);
                this.props.navigation.navigate('HackathonForum', {
                  id: this.props.id,
                  data: this.props.data,
                });
              }}
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
