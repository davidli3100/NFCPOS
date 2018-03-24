import React, { Component } from 'react';
import {ToastAndroid} from "react-native";
import { Image } from 'react-native';
import {
  View,
  Platform,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
  CardItem,
  Thumbnail
} from 'react-native';
import NfcManager, {NdefParser} from 'react-native-nfc-manager'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import Gum from './gum';
import Mouse from './mouse';
import Paper from './paper';
import None from './blank';

export default class AnatomyExample extends Component {
  renderSelectedApp () {
    switch (this.state.upc) {
      case 'gum':
      return (<Gum{...this.props}/>);
      break;
      case 'mouse':
      return (<Mouse{...this.props}/>);
      break;
      case 'paper':
      return (<Paper{...this.props}/>);
      break;
      case 'none':
      return (<None(...this.props)/>);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
        supported: true,
        enabled: false,
        tag: {},
        upc: "none"
    };
}
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
    let { supported, enabled, tag, isWriting, upc } = this.state;
    this._startNfc;
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
          <TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
            <Text style={{ color: 'blue' }}>Start Tag Detection</Text>
          </TouchableOpacity>
          
          {this.renderSelectedApp()}

          <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(tag)}`}</Text>
          <Text style={{ marginTop: 20 }}>{`UPC: ${JSON.stringify(upc)}`}</Text>
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
    upc = this._parseUri(tag);
    console.log('UPC', upc )
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
_parseUri = (tag) => {
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