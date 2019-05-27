import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Alert, DeviceEventEmitter, TouchableHighlight, Dimensions } from 'react-native';
import { Button, ThemeProvider, ListItem, ButtonGroup, Divider, SearchBar, Icon, Avatar } from 'react-native-elements';
import Moment from 'react-moment';
import { theme, SpecialButton, DateView, HeaderTitle, RegistrationIcon, SearchIcon, HeaderIcon, NotificationIcon, DateViewSingle, SentMessage, ReceivedMessage } from './Theme'
import { AppMenu, HackathonMenu } from './Menu'
import AsyncStorage from '@react-native-community/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { _getRegistrations, _isRegistered, _search } from './HelperFuncs'
import { categorySelection, participants, hosthackathons, messages } from './Data';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import moment from 'moment';


export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      title: 'Upcoming Hackathons',
      hackathons: [],
      category: 'upcoming',
    };
  }

  async componentDidMount() {
    this.props.navigation.setParams({ title: this.state.title });
    this.props.navigation.setParams({
      updateCategory: this.updateCategory.bind(this)
    });
    await this.updateSearch(this.state.search);
  }

  updateCategory = selection => {
    this.setState({
      category: selection.key,
      title: selection.value
    }, function() {
      this.updateSearch(this.state.search);
    });
  };

  updateSearch = async (search) => {
    let result = await _search(search, this.state.category);
    this.setState({
      hackathons: result,
      search: search
    });
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <SearchIcon selectionOptions={categorySelection} onChangeSelection={navigation.getParam('updateCategory')}/>,
    headerRight: (
      <AppMenu navigation={navigation}/>
    ),
  });

  render() {
    const {navigate} = this.props.navigation;
    const { search } = this.state;
    const { hackathons } = this.state;
    const { category } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#373B44', '#566166', '#3b8d99']} style={{flex: 1}}>
        <View>
        <SearchBar
          placeholder="Type here..."
          onChangeText={this.updateSearch}
          value={search}
        />
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
              rightElement={<RegistrationIcon id={l.id}/>}
              subtitle={l.where}
              onPress={() => {
                this.props.navigation.navigate('Hackathon', {
                  id: l.id,
                  data: l,
                });
              }}
              chevron
            />
          ))
        }
        </ScrollView>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }

}

export class HostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  async componentDidMount() {
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={'Hosted Hackathons'}/>,
    headerRight: (
      <AppMenu navigation={navigation}/>
    ),
  });

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#373B44', '#566166', '#aa4b6b']} style={{flex: 1}}>
        <View>
        <SearchBar
          placeholder="Type here..."
        />
        <ScrollView style={theme.ScrollView.style}>
        {
          hosthackathons.map((l, i) => (
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
              subtitle={l.where}
              onPress={() => {
                this.props.navigation.navigate('HostHackathon', {
                  id: l.id,
                  data: l,
                });
              }}
              chevron
            />
          ))
        }
        </ScrollView>
        </View>
        </LinearGradient>
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
      <HackathonMenu navigation={navigation} id={navigation.getParam('id', 'NO-ID')} data={navigation.getParam('data', '')}/>
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
        <View style={theme.FlexContainerAlt.style}>
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
            <LinearGradient colors={['#373B44', data.color, '#928DAB']}>
            <View style={theme.ButtonGroupContent.style}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
              <ScrollView>
                {this._renderContent(this.state.selectedIndex, data)}
              </ScrollView>
            </View>
            </LinearGradient>
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
          <SpecialButton
            title="Deregister"
            style={theme.InfoBoxRegister.style}
            onPress={() => this._deregisterHackathon(id)}
          />
        );
      }
      else {
        return(
          <SpecialButton
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
        //<Moment element={Text} format='MM/DD HH:mm'>{ data.whenfrom }</Moment>
        data.timetable.map((l, i, array) => (
        <View key={i}>
        {
          ((i <= array.length) && (i!=0) && (l.date.getDay() === array[i-1].date.getDay())) ?
          (
            <View><DateViewSingle when={l.date} mini={true} description={l.decription}/></View>
          )
          :
          (
            <View>
            <Text style={theme.ContentText.style}>{ moment(l.date).format('DD MMMM') }</Text>
            <DateViewSingle when={l.date} mini={true} description={l.decription}/>
            </View>
          )
        }
        </View>
        )
      ));
    }
    else if (index==2) {
      return (
        <Text style={theme.ContentText.style}>Bring a laptop</Text>
      );
    }
    else {
      return (
        <Text style={theme.ContentText.style}>UNIMPLEMENTED</Text>
      );
    }
  }
}

export class HackathonParticipantsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={navigation.state.params.data.name + ' Participants'}/>,
    headerRight: (
      <View style={theme.HeaderMenu.style}>
      <TouchableHighlight onPress={() => navigation.navigate('Home', {})}>
        <HeaderIcon name='home' type='font-awesome' color='black' menu={true}/>
      </TouchableHighlight>
      </View>
    ),
  });

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#373B44', '#566166', '#3b8d99']} style={{flex: 1}}>
        <View>
        <ScrollView style={theme.ScrollView.style}>
        {
          participants.map((l, i) => (
            <ListItem
              key={i}
              linearGradientProps={{
                colors: ['#373B44', l.color, '#928DAB'],
                start: {x: 0, y: 0},
                end: {x: 1, y: 0},
              }}
              ViewComponent={LinearGradient}
              leftAvatar={{ rounded: true, source: l.avatar, size: 'large', }}
              rightElement={<Icon
                name='paper-plane'
                type='font-awesome'
                color='white'
                onPress={() => {
                    this.props.navigation.navigate('MessageCenter', {});
                  }}
                />}
              title={l.name}
            />
          ))
        }
        </ScrollView>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }

}

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={'Profile'}/>,
    headerRight: (
      <View style={theme.HeaderMenu.style}>
      <TouchableHighlight onPress={() => navigation.navigate('Home', {})}>
        <HeaderIcon name='home' type='font-awesome' color='black' menu={true}/>
      </TouchableHighlight>
      </View>
    ),
  });

  render() {
    const data = participants[1];

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#aa4b6b', '#6b6b83', '#3b8d99', '#373B44']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItem.style}>
          <View style={theme.FlexContainerHorizontal.style}>
            <View style={theme.FlexItemHorizontal.style}>
              <Avatar
                rounded
                source={data.avatar}
                size='xlarge'
              />
            </View>
            <View style={theme.FlexItemHorizontal.style}>
              <Text h1>{data.name}</Text>
              <Divider/>
              <Text h1>{data.email}</Text>
              <Divider/>
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


export class MessageCenterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex})
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={'Messages'}/>,
    headerRight: (
      <View style={theme.HeaderMenu.style}>
      <TouchableHighlight onPress={() => navigation.navigate('Home', {})}>
        <HeaderIcon name='home' type='font-awesome' color='black' menu={true}/>
      </TouchableHighlight>
      </View>
    ),
  });

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const buttons = ['Private Messages', 'Hackathon Alerts', 'Forum Alerts'];
    const { selectedIndex } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#373B44', '#566166', '#3b8d99']} style={{flex: 1}}>
        <SearchBar
          placeholder="Type here..."
        />
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItemAlt.style}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
            <View style={theme.ButtonGroupContentAlt.style}>
              <ScrollView>
                {this._renderContent(this.state.selectedIndex)}
              </ScrollView>
            </View>
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }

  _renderContent(index) {
    if (index==0) {
      let list = participants.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ rounded: true, source: l.avatar, size: 'large', }}
          rightElement={<Moment element={Text} format='h:mm a'>1976-04-19T12:59-0500</Moment>}
          title={l.name}
          chevron
          linearGradientProps={{
            colors: ['#373B44', l.color, '#928DAB'],
            start: {x: 0, y: 0},
            end: {x: 1, y: 0},
          }}
          ViewComponent={LinearGradient}
          onPress={() => {
            this.props.navigation.navigate('PrivateMessage', {data: l});
          }}
        />
      ));
      return (
        list
      );
    }
    else if (index==1) {
      return (
        //<Moment element={Text} format='MM/DD HH:mm'>{ data.whenfrom }</Moment>
        <Text style={theme.ContentText.style}></Text>
      );
    }
    else if (index==2) {
      return (
        <Text style={theme.ContentText.style}></Text>
      );
    }
    else {
      return (
        <Text style={theme.ContentText.style}>UNIMPLEMENTED</Text>
      );
    }
  }
}

export class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={'Chatting with ' + navigation.getParam('data', {}).name}/>,
    headerRight: (
      <View style={theme.HeaderMenu.style}>
      <TouchableHighlight onPress={() => navigation.navigate('Home', {})}>
        <HeaderIcon name='home' type='font-awesome' color='black' menu={true}/>
      </TouchableHighlight>
      </View>
    ),
  });

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const data = navigation.getParam('data', {});

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#373B44', data.color, '#3b8d99']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItemAlt.style}>
            <ScrollView>
              {
                messages.map((l, i) => (
                <ReceivedMessage
                  key={i}
                  avatar={data.avatar}
                  date={<Moment element={Text} format='MMMM Do YYYY, h:mm:ss a'>{l.date}</Moment>}
                  message={l.message}
                />
                ))
              }
              <SentMessage
                key={99}
                avatar={participants[1].avatar}
                date={<Moment element={Text} format='MMMM Do YYYY, h:mm:ss a'>{moment()}</Moment>}
                message={'Yip yip'}
              />
            </ScrollView>
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }

}

export class HostHackathonScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title={'Statistics'}/>,
    headerRight: (
      <View style={theme.HeaderMenu.style}>
      <TouchableHighlight onPress={() => navigation.navigate('Host', {})}>
        <HeaderIcon name='home' type='font-awesome' color='black' menu={true}/>
      </TouchableHighlight>
      </View>
    ),
  });

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [ 20, 45, 28, 80, 99, 43 ],
      //  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      }]
    };
    const data2 = [
      { name: 'A', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'B', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'C', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'D', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'E', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];
    const chartConfig = {
      backgroundColor: 'transparent',
    //  backgroundGradientFrom: '#373B44',
    //  backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2 // optional, default 3
    };
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
      <ThemeProvider theme={theme}>
        <LinearGradient colors={['#373B44', '#566166', '#aa4b6b']} style={{flex: 1}}>
        <View style={theme.FlexContainer.style}>
          <View style={theme.FlexItemAlt.style}>
              <ScrollView>
              <Text style={theme.InfoBoxTitle.style}>{ 'Registrations' }</Text>
              <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                />
              <Text style={theme.InfoBoxTitle.style}>{ 'Random Stuff' }</Text>
              <PieChart
                data={data2}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              </ScrollView>
          </View>
        </View>
        </LinearGradient>
      </ThemeProvider>
    );
  }


}
