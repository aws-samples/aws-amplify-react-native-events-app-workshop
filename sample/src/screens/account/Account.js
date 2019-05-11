import React from "react";
import { Container, Thumbnail, Card, CardItem, Body, Content, Right, Button, Text, Input, Item, Label } from "native-base";
import { Auth } from "aws-amplify";
import { recordEvent } from '../../aws.js';

export default class Account extends React.Component {
  static navigationOptions = {
    title: 'Account',
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone_number: "",
      hometown: "",
      user: [],
    }
  }
  componentDidMount() {
    this.getCurrentUserInfo();
  }

  getUser = async () => {
    let user = await Auth.currentAuthenticatedUser();
    this.setState({ user: user })
    return user;
  }
  getCurrentUserInfo = async () => {
    let userInfo = await Auth.currentUserInfo();
    console.log(userInfo);
    this.setState({
      id: userInfo.id,
      username: userInfo.username,
      email: userInfo.attributes.email,
      phone_number: userInfo.attributes.phone_number,
      hometown: userInfo.attributes.hometown,
    })
  }
  handleFieldEdit = (field, value) => {
    var current = {};
    current[field] = value;
    this.setState(current);
  }
  handleSavePress = async () => {
    let { user, hometown } = this.state;
    const result = await Auth.updateUserAttributes(user, {
      'hometown': hometown,
    });
    console.log(result);
  }
  handleSignOut = async () => {
    recordEvent("userSignOut");
    Auth.signOut();
  }
  render() {
    let { username, email, phone_number, hometown } = this.state;
    return (
      <Container>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Body style={{ flex: 5 }}>
                <Item fixedLabel>
                  <Label>Name</Label>
                  <Input placeholder="What is your name"
                    value={username}
                    disabled
                    style={{ color: 'grey' }}
                  />
                </Item>
              </Body>
              <Right style={{ flex: 2, justifyContent: 'flex-start' }}>
                <Thumbnail size={50} source={{ uri: 'https://placekitten.com/100/200' }} />
              </Right>
            </CardItem>
            <CardItem>
              <Body style={{ flex: 1 }}>
                <Item fixedLabel>
                  <Label>Email</Label>
                  <Input placeholder="What is your email?" value={email} disabled style={{ color: 'grey' }} />
                </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{ flex: 1 }}>
                <Item fixedLabel>
                  <Label>Phone Number</Label>
                  <Input placeholder="What is your phone number?" value={phone_number} disabled style={{ color: 'grey' }} />
                </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{ flex: 1, display: 'none' }}>
                <Item fixedLabel>
                  <Label>Hometown</Label>
                  <Input placeholder="Where is your hometown?"
                    onChangeText={this.handleFieldEdit.bind(this, 'hometown')}
                    value={hometown}
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Button primary block rounded
            style={{ marginTop: 10, display: 'none' }}
            onPress={() => this.handleSavePress()}>
            <Text>Save</Text>
          </Button>
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.handleSignOut()}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
