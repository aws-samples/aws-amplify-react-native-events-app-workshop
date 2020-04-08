import React from 'react';
import {
  Container,
  Body,
  Button,
  Text,
  Content,
  Card,
  CardItem,
  Header,
  Left,
  Icon,
  Right,
  Title
} from 'native-base';

export default function({ navigation }) {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Home Header</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>
      <Content padder style={{ alignContent: 'center' }}>
        <Card>
          <CardItem>
            <Body>
              <Text>This is a detail screen!</Text>
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                bordered
              >
                <Text>Back to home screen</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
