import React, { Component } from 'react';
import { Dimensions, View, Text, DeviceEventEmitter, Picker } from "react-native";
import Moment from 'react-moment';
import moment from 'moment';
import {
  Avatar,
  Button,
  Input,
  Icon,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { _getRegistrations } from './HelperFuncs'

const window = Dimensions.get('window');
const scaledFontSize = window.width / 24;
const font = 'Octovetica Free';

//export const FlexContainer = (props) => <View {...props}></View>;

export const SpecialButton = (props) => <Button {...props}></Button>;

export class SentMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={theme.SentMessageWrapper}>
        <Text style={theme.SentDateWrapper}>
          <Moment element={Text} format='h:mm a'>{this.props.date}</Moment>
        </Text>
        <Text style={theme.SentMessageContentWrapper}>
          {this.props.message}
        </Text>
        <Avatar
          rounded
          source={this.props.avatar}
          size='medium'
        />
      </View>
    )
  }
}

export class ReceivedMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={theme.ReceivedMessageWrapper}>
        <Avatar
          rounded
          source={this.props.avatar}
          size='medium'
        />
        <Text style={theme.ReceivedMessageContentWrapper}>
          {this.props.message}
        </Text>
        <Text style={theme.ReceivedDateWrapper}>
          <Moment element={Text} format='h:mm a'>{this.props.date}</Moment>
        </Text>
      </View>
    )
  }
}

export class SearchIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'upcoming'
    };
  }
  render() {
    return (
      <View style={theme.SearchIcon}>
      <Picker
        selectedValue={this.state.selected}
        mode='dialog'
        style={theme.SearchIcon}
        onValueChange={(itemValue, itemIndex) => {
          this.setState({selected: itemValue});
          this.props.onChangeSelection({key: itemValue, value: this.props.selectionOptions[itemIndex].value});
        }}>
        {
          this.props.selectionOptions.map((l, i) => (
              <Picker.Item
                key={i}
                label={l.value}
                value={l.key}
              />
          ))
        }
      </Picker>
      </View>
    )
  }
}

export class NotificationIcon extends React.Component {
  render() {
    return (
      this.props.menu ?
      (
        <View style={theme.NotificationWrapperMenu.style}>
          <View style={theme.NotificationOverlayMenu.style}>
            <Icon name='exclamation' type='font-awesome' color='#bf0d3c'/>
          </View>
          <View style={theme.NotificationIconMenu.style}>
            <Icon name={this.props.name} type={this.props.type} color={this.props.color}/>
          </View>
        </View>
      )
      :
      (
        <View style={theme.NotificationWrapper.style}>
          <View style={theme.NotificationOverlay.style}>
            <Icon name='exclamation' type='font-awesome' color='#bf0d3c'/>
          </View>
          <View style={theme.NotificationIcon.style}>
            <Icon name={this.props.name} type={this.props.type} color={this.props.color}/>
          </View>
        </View>
      )
    )
  }
}

export class HeaderIcon extends React.Component {
  render() {
    return (
      this.props.menu ?
      (
        <View style={theme.NotificationWrapperMenu.style}>
          <View style={theme.NotificationOverlayMenu.style}>
          </View>
          <View style={theme.NotificationIconMenu.style}>
            <Icon name={this.props.name} type={this.props.type} color={this.props.color}/>
          </View>
        </View>
      )
      :
      (
        <View style={theme.NotificationWrapper.style}>
          <View style={theme.NotificationOverlay.style}>
          </View>
          <View style={theme.NotificationIcon.style}>
            <Icon name={this.props.name} type={this.props.type} color={this.props.color}/>
          </View>
        </View>
      )
    )
  }
}

export class HeaderTitle extends React.Component {
  render() {
    return (
      <View>
          <Text style={theme.HeaderStyle.style}>{this.props.title}</Text>
      </View>
    )
  }
}

export class RegistrationIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrations: false,
  //    renderTest: 0,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('refreshHome', async (e)=>{
      console.debug('in refresh', this.props.id);
      await this.componentDidMount();
    })
  }

  async componentDidMount() {
    console.debug('in mount');
    const asyncdata = await _getRegistrations();
    this.setState({ registrations: asyncdata });
  }

  render() {
    const id = this.props.id;
    return (
      <View>
      {this._renderIcon(id)}
      </View>
    )
  }

  _renderIcon(id) {
    console.debug('in render', this.state.registrations);
    if (!this.state.registrations) {
      return (
        <Text></Text>
      );
    }
    else {
      if (this.state.registrations.hasOwnProperty(id.toString())) {
        return(
          <Text>Registered!</Text>
        );
      }
      else {
        return(
          <Text></Text>
        );
      }
    }
  }
}

export class DateView extends React.Component {
  render() {
    const whenfromDay_f = moment(this.props.whenfrom).format('DD');
    const whenfromMonth_f = moment(this.props.whenfrom).format('MMMM');
    const whenfromYear_f = moment(this.props.whenfrom).format('YYYY');
    const whenfromTime_f = moment(this.props.whenfrom).format('HH:mm');
    const whentoDay_f = moment(this.props.whento).format('DD');
    const whentoMonth_f = moment(this.props.whento).format('MMMM');
    const whentoYear_f = moment(this.props.whento).format('YYYY');
    const whentoTime_f = moment(this.props.whento).format('HH:mm');

    return (
      <View style={theme.DateboxWrapper.style}>
      { this.props.mini ?
        (
          <View style={theme.DateboxFlexMini.style}>
          <View style={theme.DateBoxMini.style}>
            <Text style={theme.DateTextMonth.style}>{whenfromDay_f} {whenfromMonth_f}</Text>
            <Text style={theme.DateTextTime.style}>{whenfromTime_f}</Text>
          </View>
          <View style={theme.DateBoxDivider.style}>
          </View>
          <View style={theme.DateBoxMini.style}>
            <Text style={theme.DateTextMonth.style}>{whentoDay_f} {whentoMonth_f}</Text>
            <Text style={theme.DateTextTime.style}>{whentoTime_f}</Text>
          </View>
          </View>
        )
        :
        (
          <View style={theme.DateboxFlex.style}>
          <View style={theme.DateBox.style}>
            <Text style={theme.DateTextDay.style}>{whenfromDay_f}</Text>
            <Text style={theme.DateTextMonth.style}>{whenfromMonth_f}</Text>
            <Text style={theme.DateTextYear.style}>{whenfromYear_f}</Text>
            <Text style={theme.DateTextTime.style}>{whenfromTime_f}</Text>
          </View>
          <View style={theme.DateBoxDivider.style}>
          </View>
          <View style={theme.DateBox.style}>
            <Text style={theme.DateTextDay.style}>{whentoDay_f}</Text>
            <Text style={theme.DateTextMonth.style}>{whentoMonth_f}</Text>
            <Text style={theme.DateTextYear.style}>{whentoYear_f}</Text>
            <Text style={theme.DateTextTime.style}>{whentoTime_f}</Text>
          </View>
          </View>
        )
      }
      </View>
    );
  }
}


export class DateViewSingle extends React.Component {
  render() {
    const whenDay_f = moment(this.props.when).format('DD');
    const whenMonth_f = moment(this.props.when).format('MMMM');
    const whenYear_f = moment(this.props.when).format('YYYY');
    const whenTime_f = moment(this.props.when).format('HH:mm');

    return (
      <View style={theme.DateboxWrapperSingle.style}>
      { this.props.mini ?
        (
          <View style={theme.DateboxFlexMini.style}>
          <View style={theme.DateBoxMiniSingle.style}>
            <Text style={theme.DateTextMonth.style}>{whenTime_f}</Text>
          </View>
          <View style={theme.DateBoxDivider.style}>
          </View>
          <View style={theme.DateBoxMiniDescript.style}>
            <Text style={theme.TimetableDescription.style}>{ this.props.description }</Text>
          </View>
          </View>
        )
        :
        (
          <View style={theme.DateboxFlex.style}>
          <View style={theme.DateBox.style}>
            <Text style={theme.DateTextDay.style}>{whenDay_f}</Text>
            <Text style={theme.DateTextMonth.style}>{whenMonth_f}</Text>
            <Text style={theme.DateTextYear.style}>{whenYear_f}</Text>
            <Text style={theme.DateTextTime.style}>{whenTime_f}</Text>
          </View>
          <View style={theme.DateBoxDivider.style}>
          </View>
          <View style={theme.DateBoxMiniDescript.style}>
            <Text style={theme.TimetableDescription.style}>{ this.props.description }</Text>
          </View>
          </View>
        )
      }
      </View>
    );
  }
}

export const theme = {
  colors: {
  /*
    primary: 'red',
    secondary: 'blue',
    grey0: 'green',
    greyOutline: 'black',
    */
  },

  InfoBoxRegister: {
    style: {
      type: 'solid',
      buttonStyle: {
        borderRadius: 8,
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(55, 59, 68, 0.8)',
    //    underlayColor: 'rgba(55, 59, 68, 0.9)',
        height: '40%',
      },
      containerStyle: {
        padding: 6,
        minHeight: window.height * 0.05 || '5%',
      },
      titleStyle: {
        color: '#FFFFFF',
        fontFamily: font,
        fontSize: 26,
      },
    }
  },

  Button: {
    type: 'outline',
    buttonStyle: {
      borderRadius: 8,
      borderColor: '#FFFFFF',
    },
    containerStyle: {
      marginBottom: window.height * 0.01 || '1%',
      padding: 6,
      minHeight: window.height * 0.05 || '5%',
    },
    titleStyle: {
      color: '#FFFFFF',
      fontFamily: font,
    },
  },

  ListItem: {
    titleStyle: {
      fontSize: 22,
      fontFamily: font,
      color: '#FFFFFF',
    },
    subtitleStyle: {
      fontSize: 18,
      fontFamily: font,
      color: '#FFFFFF',
    },
    containerStyle: {
      borderColor: '#FFFFFF',
      // borderWidth: 0.5,
      borderBottomWidth: 0.5,
      // borderRadius: 8,
    }
  },

  ScrollView: {
    style: {
      indicatorStyle: 'white',
    //  showsHorizontalScrollIndicator: true,
      borderRadius: 8,
      contentInsetAdjustmentBehavior: 'scrollableAxes',
      contentContainerStyle: {
      //  borderColor: '#FFFFFF',
      //  borderWidth: 2,
      //  borderStyle: 'dotted',
        margin: 1,
        padding: 1,
      },
    }
  },

  DateboxFlex: {
    style: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      borderRadius: 8,
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderStyle: 'dotted',
    //  marginRight: 1,
    //  padding: 1,
      width: window.width * 0.3 || '30%',
      height: window.width * 0.3 || '30%',
      flexBasis: 0,
      flexGrow: 1,
    }
  },

  DateboxFlexMini: {
    style: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      borderRadius: 8,
      borderColor: '#FFFFFF',
      borderWidth: 0.5,
      borderStyle: 'solid',
    }
  },

  DateboxWrapper: {
    style: {
    }
  },

  DateboxWrapperSingle: {
    style: {
      padding: 1,
    }
  },

  DateBox: {
    style: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      minWidth: window.width * 0.15 || '15%',
      minHeight: window.width * 0.15 || '15%',
      alignSelf: 'center',
      alignItems: 'center',
      // flexBasis: 0,
      // flexGrow: 1,
      // color: '#FFFFFF',
      // fontFamily: font,
      // fontSize: 26,
    }
  },

  DateBoxMini: {
    style: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      minWidth: window.width * 0.15 || '15%',
      minHeight: window.width * 0.15 || '15%',
      width: '50%',
      alignSelf: 'center',
      alignItems: 'center',
    }
  },

  DateBoxMiniSingle: {
    style: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      minWidth: window.width * 0.15 || '15%',
      minHeight: window.width * 0.15 || '15%',
      width: '30%',
      alignSelf: 'center',
      alignItems: 'center',
    }
  },

  DateBoxMiniDescript: {
    style: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      minWidth: window.width * 0.15 || '15%',
      minHeight: window.width * 0.15 || '15%',
      width: '70%',
      alignSelf: 'center',
      alignItems: 'center',
    }
  },

  DateBoxDivider: {
    style: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignSelf: 'stretch',
      alignItems: 'center',
      borderColor: '#FFFFFF',
      borderLeftWidth: 0.5,
      borderStyle: 'dotted',
      // color: '#FFFFFF',
      // fontFamily: font,
      // fontSize: 26,
    }
  },

  DateTextDay: {
    style: {
      fontSize: 32,
      fontFamily: font,
      color: '#FFFFFF',
    }
  },

  DateTextMonth: {
    style: {
      fontSize: 22,
      fontFamily: font,
      color: '#FFFFFF',
    }
  },

  DateTextTime: {
    style: {
      fontSize: 18,
      fontFamily: font,
      color: '#FFFFFF',
      borderTopWidth: 1,
      borderColor: '#FFFFFF',
      paddingTop: 6,
      marginRight: 3,
      alignSelf: 'stretch',
      //alignItems: 'center',
      textAlign: 'center',
    }
  },

  DateTextHeader: {
    style: {
      fontSize: 12,
      fontFamily: font,
      color: '#FFFFFF',
      borderBottomWidth: 1,
      borderColor: '#FFFFFF',
      paddingBottom: 1,
      alignSelf: 'stretch',
      textAlign: 'right',
    }
  },

  DateTextYear: {
    style: {
      fontSize: 22,
      fontFamily: font,
      color: '#FFFFFF',
    }
  },

  Divider: {
    backgroundColor: '#FFFFFF',
  },

  Input: {
    inputStyle: {
      color: '#FFFFFF',
      fontFamily: font,
    },
    underlineColorAndroid: '#FFFFFF',
    placeholderTextColor: '#FFFFFF',
    inputContainerStyle: {
      //color: '#FFFFFF',
      //fontFamily: font,
      padding: 6,
    },
    leftIconContainerStyle: {
      //color: '#FFFFFF',
    },
    leftIcon: {
      color: '#FFFFFF',
      margin: 2,
    }
  },

  FlexContainer: {
    style: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      marginTop: 2,
    },
  },

  FlexContainerAlt: {
    style: {
      flex: 1,
      flexDirection: 'column',
    //  justifyContent: 'center',
      alignItems: 'stretch',
    },
  },
/*
  FlexContainerPage: {
    style: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'stretch',
      height: '95%',
      width: '95%',
    },
  },

  */

  FlexContainerHorizontal: {
    style: {
      flex: 1,
      flexDirection: 'row',
    //  flexWrap: 'nowrap',
    //  justifyContent: 'baseline',
    //  alignItems: 'stretch',
      alignSelf: 'flex-start',
    },
  },

  FlexItemHorizontal: {
    style: {
    //  alignSelf: 'baseline',
      flexBasis: '50%',
    }
  },

  FlexItem: {
    style: {
      marginRight: window.height * 0.05 || '5%',
      marginLeft: window.height * 0.05 || '5%',
    }
  },

  FlexItemAlt: {
    style: {
  //    marginRight: window.height * 0.03 || '3%',
  //    marginLeft: window.height * 0.03 || '3%',
    }
  },

  FlexItemLast: {
    style: {
      marginRight: window.height * 0.05 || '5%',
      marginLeft: window.height * 0.05 || '5%',
      alignSelf: 'flex-end',
      alignItems: 'center',
    }
  },

  FlexLogo: {
    style: {
      marginRight: window.height * 0.05 || '5%',
      marginLeft: window.height * 0.05 || '5%',
      marginTop: window.height * 0.05 || '5%',
      flexGrow: 0.3,
      alignSelf: 'stretch',
    }
  },

  Text: {
    style: {
      fontSize: scaledFontSize,
      fontFamily: font,
  //    color: '#FFFFFF',
    }
  },

  Logo: {
    style: {
      fontFamily: 'Octovetica Free',
      fontSize: 26,
      color: '#FFFFFF',
      textAlign: 'center',
      //fontWeight: 'bold',
      borderColor: '#FFFFFF',
      borderRadius: 8,
      borderWidth: 2,
    //  borderTopWidth: 2,
      borderStyle: 'dotted',
      padding: 8,
    //  paddingTop: 8,
      margin: 1,
    }
  },

  HeaderStyle: {
    style: {
      fontFamily: 'Octovetica Free',
      fontSize: 26,
      paddingLeft: 20,
    }
  },

  BackgroundView: {
    backgroundColor: 'black',
    style: {
      backgroundColor: 'black',
    }
  },

  SearchIcon: {
    fontFamily: 'Octovetica Free',
    fontSize: 26,
    height: 60,
    width: '90%',
    itemTextStyle: {
      fontFamily: 'Octovetica Free',
      fontSize: 26,
      paddingLeft: 4,
    },
    textStyle: {
      fontFamily: 'Octovetica Free',
      fontSize: 26,
      paddingLeft: 4,
    },
    itemTextStyle:{fontSize: 26, fontFamily: 'Octovetica Free'},
    activeItemTextStyle:{fontSize: 26, fontFamily: 'Octovetica Free'},
  },

  HeaderMenu: {
    style: {
      flex:1,
      marginRight: 6,
      marginLeft: 6,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      maxWidth: window.width * 0.30 || '40%',
      alignItems: 'center',
    //  textAlign: 'center',
    }
  },

  ButtonGroup: {
    innerBorderStyle: {
      width: 0,
    },
    containerStyle: {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderWidth: 0,
      margin: 0,
      padding: 0,
      width: '100%',
      marginLeft: -1,
    },
    buttonStyle: {
    //  backgroundColor: 'rgba(0,0,0,0.0)',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderWidth: 0.5,
      borderColor: '#FFFFFF',
      margin: 0,
      padding: 0,
      width: '100%',
      backgroundColor: 'rgba(55, 59, 68, 0.8)'
    },
    selectedButtonStyle: {
      backgroundColor: 'rgba(55, 59, 68, 1)',
    },
    textStyle: {
      color: '#FFFFFF',
      fontFamily: font,
      fontSize: 18,
      padding: 0,
      margin: 2,
    },
    underlayColor: 'rgba(0,0,0,0.0)',
  },

  ButtonGroupContent: {
    style: {
    //  borderRadius: 8,
      borderColor: '#FFFFFF',
      borderTopWidth: 0.5,
      flexGrow: 2,
    //  minHeight: '40%',
      alignSelf: 'stretch',
      flexBasis: '80%',
  //    backgroundColor: 'rgba(55, 59, 68, 0.6)',
    },
  },

  ButtonGroupContentAlt: {
    style: {
      borderColor: '#FFFFFF',
      borderTopWidth: 0.5,
      flexGrow: 2,
    //  minHeight: '40%',
      alignSelf: 'stretch',
      flexBasis: '90%',
    },
  },

  ContentText: {
    style: {
      color: '#FFFFFF',
      fontFamily: font,
      fontSize: 18,
      padding: 0,
      margin: 8,
    }
  },

  Overlay: {

  },

  OverlayMenuFlex: {
    style: {

    }
  },

  InfoBox: {
    style: {
      flexBasis: '20%',
    //  borderRadius: 8,
      borderColor: '#FFFFFF',
      borderBottomWidth: 0.5,
      padding: 5,
      backgroundColor: 'rgba(55, 59, 68, 0.5)',
    }
  },

  InfoBoxTitle: {
    style: {
      color: '#FFFFFF',
      fontFamily: font,
      fontSize: 18,
      marginLeft: 24,
      marginTop: 15,
    }
  },

  TimetableDescription: {
    style: {
      color: '#FFFFFF',
      fontFamily: font,
      fontSize: 18,
      marginLeft: 10,
      textAlign: 'center',
    }
  },

  SearchBar: {
    searchIcon: {
      color: '#FFFFFF',
    },
    textStyle: {
      fontFamily: font,
      fontSize: 18,
    },
    inputStyle: {
      color: '#FFFFFF',
      fontFamily: font,
      fontSize: 18,
    },
    inputContainerStyle: {
      backgroundColor: 'rgba(0,0,0,0.0)',
    },
    containerStyle: {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderBottomColor: 'white',
    },
    style: {
      backgroundColor: 'rgba(0,0,0,0.0)',
    },

  },

  NotificationWrapper: {
    style: {
      position:'relative',
      width: 25,
      height: 25,
    }
  },

  NotificationIcon: {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
    }
  },

  NotificationOverlay: {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 20,
    }
  },

  NotificationWrapperMenu: {
    style: {
      position:'relative',
      width: 35,
      height: 25,
    }
  },

  NotificationIconMenu: {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
    }
  },

  NotificationOverlayMenu: {
    style: {
      position: 'absolute',
      top: 0,
      left: 25,
      zIndex: 20,
    }
  },

  SentMessageWrapper: {
    padding: 2,
    marginRight: 1,
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',

  },

  ReceivedMessageWrapper: {
    padding: 2,
    marginLeft: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  SentDateWrapper: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
  },

  ReceivedDateWrapper: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
  },

  SentMessageContentWrapper: {
    minHeight: '40%',
    minWidth: '60%',
    maxWidth: '60%',
    padding: 10,
    paddingRight: 22,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(55, 59, 68, 0.9)',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    color: '#FFFFFF',
    fontFamily: font,
    fontSize: 18,
  },

  ReceivedMessageContentWrapper: {
    minHeight: '40%',
    minWidth: '60%',
    maxWidth: '60%',
    padding: 10,
    paddingLeft: 22,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(55, 59, 68, 0.2)',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    color: '#FFFFFF',
    fontFamily: font,
    fontSize: 18,
  },

};
