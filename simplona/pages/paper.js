import React, { Component } from 'react';
import { View, Container, Thumbnail, CardItem, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container>
        <Content>
        <View>
            <CardItem>
            <Left>
                <Thumbnail large source={{uri: './assets/paper.png'}} />
            </Left>
            </CardItem>
            <CardItem>
            <Body>
                <Text>Paper</Text>
                <Text note>$4.99</Text>
            </Body>
            </CardItem>
        </View>
        </Content>
      </Container>
    );
  }
}