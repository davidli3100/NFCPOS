import React, { Component } from 'react';
import {ToastAndroid} from "react-native";
import { Image } from 'react-native';
import NFC, {NfcDataType, NdefRecordType} from "react-native-nfc";
import NfcManager, {NdefParser} from 'react-native-nfc-manager';
import './nfc.js';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class AnatomyExample extends Component {
  componentDidMount() {
    NfcManager.isSupported()
        .then(supported => {
            this.setState({ supported });
            if (supported) {
                this._startNfc();
            }
        })
  }
  
  render() {
    this._startDetection
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
         
/* ok so basically we want the upc to be an active service here, when a upc is added it reads upc and then if upc is somethihng
like gum it'll automatically add a gum card item to descriptors */
            
                if (upc == "gum") {
                  product_info.push(
                    <CardItem>
                      <Left>
                      <Thumbnail large source={{uri: './assets/gum.jpg'}} />
                      </Left>
                    </CardItem>
                  <CardItem>
                  <Body>
                <Text>Gum</Text>
                <Text note>$1.99</Text>
                </Body>
                </CardItem>
                  )
                 }

                if (upc == "mouse") {
                  product_info.push(
                    <CardItem>
                    <Left>
                    <Thumbnail large source={{uri: './assets/mouse.png'}} />
                    </Left>
                  </CardItem>
                  <CardItem>
                  <Body>
                <Text>Mouse</Text>
                <Text note>$24.99</Text>
                </Body>
                </CardItem>
                  )
                }

                if (upc == "paper") {
                  product_info.push(
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
                  )
                }
              
              {product_info}
     
    
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
  
  _startNfc() {
    NfcManager.start({
        onSessionClosedIOS: () => {
            console.log('ios session closed');
        }
    })
        .then(result => {
            console.log('start OK', result);
        })
        .catch(error => {
            console.warn('start fail', error);
            this.setState({supported: false});
        })

    if (Platform.OS === 'android') {
        NfcManager.getLaunchTagEvent()
            .then(tag => {
                console.log('launch tag', tag);
                if (tag) {
                    this.setState({ tag });
                }
            })
            .catch(err => {
                console.log(err);
            })
        NfcManager.isEnabled()
            .then(enabled => {
                this.setState({ enabled });
            })
            .catch(err => {
                console.log(err);
            })
        NfcManager.onStateChanged(
            event => {
                if (event.state === 'on') {
                    this.setState({enabled: true});
                } else if (event.state === 'off') {
                    this.setState({enabled: false});
                } else if (event.state === 'turning_on') {
                    // do whatever you want
                } else if (event.state === 'turning_off') {
                    // do whatever you want
                }
            }
        )
            .then(sub => {
                this._stateChangedSubscription = sub; 
                // remember to call this._stateChangedSubscription.remove()
                // when you don't want to listen to this anymore
            })
            .catch(err => {
                console.warn(err);
            })
    }
}

_onTagDiscovered = tag => {
    console.log('Tag Discovered', tag);
    this.setState({ tag });
    let upc = this._parseText(tag);
    if (url) {
        Linking.openURL(url)
            .catch(err => {
                console.warn(err);
            })
    }
}

_startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
        .then(result => {
            console.log('registerTagEvent OK', result)
        })
        .catch(error => {
            console.warn('registerTagEvent fail', error)
        })
}
_parseText = (tag) => {
  if (tag.ndefMessage) {
      let result = NdefParser.parseUri(tag.ndefMessage[0]),
          uri = result && result.uri;
      if (uri) {
          console.log('parseUri: ' + uri);
          return uri;
      }
  }
  return null;
}
}