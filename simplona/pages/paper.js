import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class CardImageExample extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Paper</Text>
                  <Text note>$4.99</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
                <Image source={require('./assets/paper.png')} style={{  resizeMode: 'cover', height: 250, width: null, flex: 1 }} />
           </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}