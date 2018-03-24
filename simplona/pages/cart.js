import React, { Component } from 'react';
import {ToastAndroid} from "react-native";
import { Image } from 'react-native';
import NFC, {NfcDataType, NdefRecordType} from "react-native-nfc";
import NfcManager, {NdefParser} from 'react-native-nfc-manager';
import './nfc.js';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {

  
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Cart</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            <CardItem>
              <Left>
                if(upc == "gum") {
                <Thumbnail large source={{uri: './assets/gum.png'}} />
                }

                if(upc == "mouse") {
                <Thumbnail large source={{uri: './assets/mouse.png'}} />
                }

                if(upc == "paper") {
                <Thumbnail large source={{uri: './assets/paper.png'}} />
                }
              </Left>
            </CardItem>
         

               for (let i = 0; i < upc.length; i++) { 
                if (upc == "gum") {
                  <CardItem>
                  <Body>
                <Text>Gum</Text>
                <Text note>$1.99</Text>
                </Body>
                </CardItem>
                 }

                if (upc == "mouse") {
                  <CardItem>
                  <Body>
                <Text>Mouse</Text>
                <Text note>$24.99</Text>
                </Body>
                </CardItem>
                }

                if (upc == "paper") {
                  <CardItem>
                  <Body>
                <Text>Paper</Text>
                <Text note>$4.99</Text>
                </Body>
                </CardItem>
                }
              }
              { descriptors }
    
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}