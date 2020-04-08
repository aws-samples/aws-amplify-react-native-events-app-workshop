import React from 'react';
import {
  Container,
  Body,
  Button,
  Text,
  Content,
  Card,
  CardItem
} from 'native-base';

export default function({ navigation }) {
  return (
    <Container>
      <Content padder style={{ alignContent: 'center' }}>
        <Card>
          <CardItem>
            <Body>
              <Text>This is a modal!</Text>
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                bordered
              >
                <Text>Close</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
