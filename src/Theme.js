import React, { Component } from 'react';
import { Dimensions, View } from "react-native";
import {
  Button,
  Input,
} from 'react-native-elements';

const window = Dimensions.get('window');
const scaledFontSize = window.width / 24;
const font = 'normal';

//export const FlexContainer = (props) => <View {...props}></View>;

export const theme = {
  colors: {
  /*
    primary: 'red',
    secondary: 'blue',
    grey0: 'green',
    greyOutline: 'black',
    */
  },

  Button: {
    type: 'outline',
    buttonStyle: {
      borderRadius: 8,
    },
    containerStyle: {
      marginBottom: window.height * 0.01,
    },
  },

  Input: {
    inputStyle: {
    },
  },

  FlexContainer: {
    style: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    },
  },

  FlexItem: {
    style: {
      marginRight: window.height * 0.05 || '5%',
      marginLeft: window.height * 0.05 || '5%',
    }
  },

  Text: {
    style: {
      fontSize: scaledFontSize,
      fontFamily: font,
    }
  },
};
