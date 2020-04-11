import React from 'react';
import { Body, Text, Card, CardItem } from 'native-base';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function EventBox(props) {
  let { event, isClickable } = props;
  const navigation = useNavigation();

  let color = 'black';
  const today = new Date().getTime() / 1000;
  const oneday = 60 * 24 * 60;
  if (event.startAt - today > 7 * oneday) color = 'green';
  else if (event.startAt - today < oneday) color = 'red';
  // else if (event.startAt - newDate().getTime() < 7 * 60 * 24) setColor('green');

  return (
    <Card key={event.id}>
      <CardItem style={{ padding: 1, backgroundColor: color }}></CardItem>
      <CardItem
        button
        onPress={() => {
          if (isClickable) navigation.navigate('Event', { event });
        }}
      >
        <Body>
          <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
          <Text style={{ marginTop: 5 }}>{event.description}</Text>
          <Text style={{ marginTop: 5 }}>
            {moment.unix(event.startAt).calendar()}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
}
