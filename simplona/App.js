'use strict';
import React,{Component} from 'react';

import {StyleProvider,Footer,Header,Container,Icon,Title,Content,Button,FooterTab,Body} from 'native-base';
import {Text} from 'react-native';
import Home from './pages/home';       // Home Screen
import Deals from './pages/deals';     // Deals Screen
import NFC from './pages/nfc';         // NFC Scanning Interface
import Cart from './pages/cart';       // Cart Screen
import Profile from './pages/profile'; // Profile screen
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

class App extends Component {
  renderSelectedTab () {
    switch (this.state.selectedTab) {
    case 'home':
    return (<Home{...this.props}/>);
    break;
    case 'deals':
    return (<Deals{...this.props}/>);
    break;
    case 'nfc':
    return (<NFC{...this.props}/>);
    break;
    case 'cart':
    return (<Cart{...this.props}/>)
    break;
    case 'profile':
    return (<Profile{...this.props}/>);
    break;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "cart"
    };
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>
        
        <Content>
          {this.renderSelectedTab()}
        </Content>

        <StyleProvider style={getTheme(material)}>        
          <Footer>
            <FooterTab>
              <Button onPress={() => this.setState({selectedTab: 'home'})}
                style={[this.state.active && stypes.background]}>
                <Icon name="home" />
              </Button>

              <Button onPress={() => this.setState({selectedTab: 'deals'})}>
                <Icon name="pricetags" />
              </Button>

              <Button onPress={() => this.setState({selectedTab: 'nfc'})}>
                <Icon name="barcode" />
              </Button>

              <Button onPress={() => this.setState({selectedTab: 'cart'})}>
                <Icon name="basket" />
              </Button>

              <Button onPress={() => this.setState({selectedTab: 'profile'})}>
                <Icon name="person" />
              </Button>

            </FooterTab>
          </Footer>
        </StyleProvider>
      </Container>
    );
  }
}

export default App;
/*
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="home" />
            </Button>
            <Button>
              <Icon name="pricetags" />
            </Button>
            <Button dark>
              <Icon name="barcode" />
            </Button>
            <Button badge vertical>
            <Badge><Text>0</Text></Badge>
            <Icon name="basket" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}*/