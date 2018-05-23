import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import Routers from './src/router';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import { Container } from 'native-base';
import * as firebase from 'firebase';
import { Root } from "native-base";
const store = configureStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Root>
            <Routers />
          </Root>
        </Container>
      </Provider>
    );
  };
};

