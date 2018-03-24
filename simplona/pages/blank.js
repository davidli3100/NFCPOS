import React, { Component } from 'react';
import { CardItem, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container>
        <Content>
          <CardItem>
            <Body>
                <Text>Nothing in cart!</Text>
            </Body>
          </CardItem>
        </Content>
      </Container>
    );
  }
}