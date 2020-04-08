import React from 'react';
import {
  Container,
  Header,
  Body,
  Button,
  Title,
  Text,
  Content,
  Card,
  CardItem
} from 'native-base';

export default function({ navigation }) {
  return (
    <Container>
      <Header>
        <Body>
          <Title>HistoryScreen</Title>
        </Body>
      </Header>
      <Content>
        <Card transparent>
          <CardItem>
            <Body>
              <Button
                onPress={() => {
                  navigation.navigate('Details');
                }}
                bordered
              >
                <Text>Go to Details Screen</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
