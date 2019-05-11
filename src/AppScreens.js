import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Alert, DeviceEventEmitter } from 'react-native';
import { Button, ThemeProvider, ListItem, ButtonGroup, Divider } from 'react-native-elements';
import Moment from 'react-moment';
import { theme, DateView, HeaderTitle, RegistrationIcon } from './Theme'
import { AppMenu, HackathonMenu } from './Menu'
import AsyncStorage from '@react-native-community/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { _getRegistrations, _isRegistered } from './HelperFuncs'


export class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title='Upcoming Hackathons'/>,
    headerRight: (
      <AppMenu navigation={navigation}/>
    ),
  });

  render() {
    const {navigate} = this.props.navigation;
    const hackathons = [
      {
        name: 'Filler Hackathon 2019',
        avatar: require('./img/hackathon1.jpg'),
        subtitle: 'Solving the lack of ideas regarding filler data.',
        where: 'Tartu. Estonia',
        whenfrom: new Date('1976-04-19T12:59:05'),
        whento: new Date('2019-05-10T12:59:05'),
        color: '#3b8d99',
      },
      {
        name: 'Lorem ipsum',
        avatar: require('./img/hackathon2.png'),
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        where: 'Tartu. Estonia',
        whenfrom: new Date('2009-06-29T12:59:05'),
        whento: new Date('2019-05-10T12:59:05'),
        color: '#6b6b83',
      },
      {
        name: 'Idea Hackathon I',
        avatar: require('./img/hackathon3.jpg'),
        subtitle: 'ÕIS2 brainstorming.',
        where: 'Tartu. Estonia',
        whenfrom: new Date('2019-04-10T12:59:05'),
        whento: new Date('2019-05-10T12:59:05'),
        color: '#aa4b6b',
      },
      {
        name: 'Garage48 Visualising Data',
        avatar: require('./img/hackathon4.jpg'),
        subtitle: 'Have you ever stared at a massive spreadsheet of data and thought how much prettier it would look when visualised?',
        where: 'Palo Alto Club. Tallinn',
        whenfrom: new Date('2019-05-09T12:59:05'),
        whento: new Date('2019-05-10T12:59:05'),
        color: '#3b8d99',
      },
      {
        name: 'Garage48 Re-Invent',
        avatar: require('./img/hackathon2.png'),
        subtitle: 'Join Garage48 Re-Invent Hackathon to change the world as we see it!',
        where: 'Andela Kigali Office. Rwanda',
        whenfrom: new Date('2019-05-10T12:59:05'),
        whento: new Date('2019-05-12T12:59:05'),
        color: '#6b6b83',
      },
      {
        name: 'Idea Garage Open Banking',
        avatar: require('./img/hackathon1.jpg'),
        subtitle: 'Luminor, Garage 48 and Mooncascade will bring to you event series which help you to change the future of banking.',
        where: 'Tallinn, Riga, Vilnius',
        whenfrom: new Date('2019-05-20T12:59:05'),
        whento: new Date('2019-05-22T12:59:05'),
        color: '#aa4b6b',
      },
      {
        name: 'Garage48 SpaceTech Bootcamp',
        avatar: require('./img/hackathon4.jpg'),
        subtitle: 'Garage48 is delighted to welcome you to a special bootcamp aimed for teams using space technologies or space data for creating new solutions.',
        where: 'Tartu. Estonia.',
        whenfrom: new Date('2019-05-29T12:59:05'),
        whento: new Date('2019-06-02T12:59:05'),
        color: '#3b8d99',
      },
    ];

    return (
      <ThemeProvider theme={theme}>
        <View>
        <ScrollView style={theme.ScrollView.style}>
        {
          hackathons.map((l, i) => (
            <ListItem
              key={i}
              linearGradientProps={{
                colors: ['#373B44', l.color, '#928DAB'],
                start: {x: 0, y: 0},
                end: {x: 1, y: 0},
              }}
              ViewComponent={LinearGradient}
              // leftAvatar={{ rounded: false, source: l.avatar, size: 'large' }}
              leftElement={<DateView whenfrom={l.whenfrom} whento={l.whento}/>}
              title={l.name}
              rightElement={<RegistrationIcon id={i}/>}
              subtitle={l.where}
              onPress={() => {
                this.props.navigation.navigate('Hackathon', {
                  id: i,
                  data: l,
                });
              }}
              chevron
            />
          ))
        }
        </ScrollView>
        </View>
      </ThemeProvider>
    );
  }

}

export class HackathonScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      registrations: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex})
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={navigation.state.params.data.name}/>,
    headerRight: (
      <HackathonMenu navigation={navigation} id={navigation.getParam('id', 'NO-ID')}/>
    ),
  });

  async componentDidMount() {
    const asyncdata = await _getRegistrations();
    this.setState({ registrations: asyncdata });
  }

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    const data = navigation.getParam('data', {});
    const { navigate } = this.props.navigation;
    const buttons = ['Introduction', 'Timetable', 'Requirements'];
    const { selectedIndex } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#928DAB', data.color, '#373B44']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItemAlt.style}>
            <View style={theme.InfoBox.style}>
              <View style={theme.FlexContainerHorizontal.style}>
                <View style={theme.FlexItemHorizontal.style}>
                  <DateView whenfrom={data.whenfrom} whento={data.whento} mini={true}/>
                  <Text style={theme.InfoBoxTitle.style}>{ data.where }</Text>
                </View>
                <View style={theme.FlexItemHorizontal.style}>
                  {this._renderButton(id)}
                  <Text style={theme.InfoBoxTitle.style}>Registered: 10</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={theme.FlexItemAlt.style}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
            <View style={theme.ButtonGroupContent.style}>
              <ScrollView>
                {this._renderContent(this.state.selectedIndex, data)}
              </ScrollView>
            </View>
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }

  _renderButton(id) {
    if (!this.state.registrations) {
      return (
        <Text>...</Text>
      );
    }
    else {
      if (_isRegistered(id, this.state.registrations)) {
        return(
          <Button
            title="Deregister"
            style={theme.InfoBoxRegister.style}
            onPress={() => this._deregisterHackathon(id)}
          />
        );
      }
      else {
        return(
          <Button
            title="Register"
            style={theme.InfoBoxRegister.style}
            onPress={() => this._registerHackathon(id)}
          />
        );
      }
    }
  }

  _deregisterHackathon = async (id) => {
    var registrations = await _getRegistrations();
    delete registrations[id];
    this.setState({registrations: registrations});
    await AsyncStorage.setItem('registrations', JSON.stringify(registrations));
    DeviceEventEmitter.emit('refreshHome',  {});
  };

  _registerHackathon = async (id) => {
    var registrations = await _getRegistrations();
    registrations[id] = true;
    this.setState({registrations: registrations});
    await AsyncStorage.setItem('registrations', JSON.stringify(registrations));
    DeviceEventEmitter.emit('refreshHome',  {});
  };

  _renderContent(index, data) {
    if (index==0) {
      return (
        <Text style={theme.ContentText.style}>{ data.subtitle }</Text>
      );
    }
    else if (index==1) {
      return (
        <Moment element={Text} format='MM/DD HH:mm'>{ data.whenfrom }</Moment>
      );
    }
    else if (index==2) {
      return (
        <Text style={theme.ContentText.style}>None</Text>
      );
    }
    else {
      return (
        <Text style={theme.ContentText.style}>UNIMPLEMENTED</Text>
      );
    }
  }
}
