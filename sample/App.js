import React from 'react';
import { AppLoading, Font } from 'expo';
import { Container } from 'native-base';
import { withAuthenticator } from 'aws-amplify-react-native';

import RootNavigator from './src/Tabs';

import { initializeAmplify } from './src/aws.js';
initializeAmplify();

class App extends React.Component {
  state = {
    isReady: false
  };

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <RootNavigator />
      </Container>
    )
  }
}

export default withAuthenticator(App);