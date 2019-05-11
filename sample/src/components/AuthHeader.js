import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Header, Left, Body, Title, Right, Icon, Button } from "native-base";
import PropTypes from 'prop-types'

export default class AuthHeader extends Component {
  static propTypes = {
    headerTitle: PropTypes.string.isRequired,
    buttonIcon: PropTypes.string.isRequired,
  }
  handlePress = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>{this.props.headerTitle}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.handlePress}>
            <Icon name={this.props.buttonIcon} />
          </Button>
        </Right>
      </Header>
    );
  }
}
