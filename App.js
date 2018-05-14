import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainComponent from './Component/MainComponent';
import {Container} from 'native-base';


export default class App extends Component {
    render() {
      return (
        <MainComponent/>
      );
    }
}
