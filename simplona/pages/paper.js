import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container>
        <Content>
        <Text>
        <div>
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
        </div>
        </Text>
        </Content>
      </Container>
    );
  }
}