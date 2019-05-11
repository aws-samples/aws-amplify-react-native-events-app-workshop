import React from "react";
import { Keyboard } from "react-native";
import { Text, View, Content, Button, Input } from "native-base";
import { NavigationActions } from 'react-navigation';
import { recordEvent, getUser } from '../../aws.js';
import { createEvent } from '../../graphql/events.js';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
//ref: https://github.com/naveenkumarsangwan/react-native-modal-datetime-picker

export default class Create extends React.Component {
  static navigationOptions = {
    title: 'Create Event',
  }
  constructor(props) {
    super(props);
    const d = moment(new Date()).format("ddd, DD MMM YYYYY HH:mmZZ");
    this.state = {
      title: '',
      description: '',
      datetime: d,
      isDateTimePickerVisible: false,
      userId: false
    }
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    try {
      const user = await getUser();
      this.setState({
        userId: user.attributes.sub,
        user: user
      });
    } catch (err) {
      console.log(err);
    }
  }

  // create the event and use AppSync to store this in DynamoDB
  handlePress = async () => {
    let { userId } = this.state;
    if (!userId) {
      alert("You are not logged in");
      this.goBack();
    }

    var dateTimeStart = Date.parse(this.state.datetime) / 1000;

    try {
      var response = await createEvent(
        this.state.title,
        this.state.description,
        dateTimeStart,
        this.state.userId
      );
      console.log(response);

      let { user } = this.state;
      recordEvent(
        'createdEvent',
        {
          username: user.username,
          userId: user.attributes.sub,
          eventId: response.data.createEvent.id
        }
      )
    }
    catch (e) {
      console.log(e)
    }
    // this.props.navigation.state.params.updateHomeEvents();
    this.goBack();
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  //datetime picker helper functions
  _showDateTimePicker = () => {
    Keyboard.dismiss();
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }

  _handleDatePicked = date => {

    this.setState({ datetime: date.toUTCString() });
    // var c = Date.parse (date.toString());
    // console.log("A date has been picked: ", date.toString());
    // console.log("A date has been picked: ", date.toUTCString());
    // console.log("A date has been picked c : ", c /1000);
    this._hideDateTimePicker();
  };

  render() {
    const today = new Date()
    const minimumDate = new moment(today).add(5, 'm').toDate();
    return (
      <Content style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '700' }}>Creating a meet up is easy</Text>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Just need 10 seconds to start.</Text>
          </View>
          <View>
            <View style={{ paddingHorizontal: 20, marginTop: 20, borderTopColor: '#dddddd', borderTopWidth: 0.5 }}>
              <Text style={{ fontSize: 24, paddingTop: 10 }}>Title</Text>
              {/* <Text style={{ fontSize: 14, fontWeight: '200', paddingTop: 10 }}>Enter a sexy title</Text> */}
              <Input placeholder="Enter a sexy title" onChange={(title) => this.setState({ title: title.nativeEvent.text })} />
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 20, borderTopColor: '#dddddd', borderTopWidth: 0.5 }}>
              <Text style={{ fontSize: 24, paddingTop: 10 }}>Description</Text>
              <Text style={{ fontSize: 14, fontWeight: '200', paddingTop: 10 }}>Let your kakis knows where to find you</Text>
              <Input placeholder="Enter address e.g. Restaurant or Cafe" onChange={(description) => this.setState({ description: description.nativeEvent.text })} />
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 10, borderTopColor: '#dddddd', borderTopWidth: 0.5 }}>
              <Text style={{ fontSize: 24, paddingTop: 10 }}>Date & Time</Text>
              <Input placeholder={this.state.datetime} onFocus={this._showDateTimePicker} />
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode="datetime"
                minimumDate={minimumDate}
              />
            </View>

            <View style={{ paddingBottom: 40 }}>
              <Button primary block rounded style={{ margin: 10 }} onPress={() => this.handlePress()}>
                <Text>Create</Text>
              </Button>
              <Button danger block rounded style={{ margin: 10 }} onPress={() => this.goBack()}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </View>
      </Content>
    );
  }
}
