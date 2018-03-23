/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { getTagId, readTag, writeTag } from 'nfc-react-native'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  DeviceEventEmitter
} from 'react-native';
<<<<<<< HEAD
=======
import NfcManager, {NdefParser} from 'react-native-nfc-manager';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            urlToWrite: 'google.com',
            tag: {},
        }
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

    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
    }

    render() {
        let { supported, enabled, tag, isWriting, urlToWrite} = this.state;
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{`Is NFC supported ? ${supported}`}</Text>
                    <Text>{`Is NFC enabled (Android only)? ${enabled}`}</Text>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
                        <Text style={{ color: 'blue' }}>Detect Tags</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._stopDetection}>
                        <Text style={{ color: 'red' }}>Stop Tag Detection</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._clearMessages}>
                        <Text>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._goToNfcSetting}>
                        <Text >(android) Go to NFC setting</Text>
                    </TouchableOpacity>

                    {
                        <View style={{padding: 10, marginTop: 20, backgroundColor: '#e0e0e0'}}>
                            <Text>(android) Write NDEF Test</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>http://www.</Text>
                                <TextInput
                                    style={{width: 200}}
                                    value={urlToWrite}
                                    onChangeText={urlToWrite => this.setState({ urlToWrite })}
                                />
                            </View>

                            <TouchableOpacity 
                                style={{ marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10 }} 
                                onPress={isWriting ? this._cancelNdefWrite : this._requestNdefWrite}>
                                <Text style={{color: 'blue'}}>{`(android) ${isWriting ? 'Cancel' : 'Write NDEF'}`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{ marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10 }} 
                                onPress={isWriting ? this._cancelNdefWrite : this._requestFormat}>
                                <Text style={{color: 'blue'}}>{`(android experimental) ${isWriting ? 'Cancel' : 'Format'}`}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(tag)}`}</Text>
                </View>
            </ScrollView>
        )
    }

    _requestFormat = () => {
        let {isWriting} = this.state;
        if (isWriting) {
            return;
        }

        this.setState({isWriting: true});
        NfcManager.requestNdefWrite(null, {format: true})
            .then(() => console.log('format completed'))
            .catch(err => console.warn(err))
            .then(() => this.setState({isWriting: false}));
    }

    _requestNdefWrite = () => {
        function strToBytes(str) {
            let result = [];
            for (let i = 0; i < str.length; i++) {
                result.push(str.charCodeAt(i));
            }
            return result;
        }

        let {isWriting, urlToWrite} = this.state;
        if (isWriting) {
            return;
        }

        const urlBytes = strToBytes(urlToWrite);
        const headerBytes = [0xD1, 0x01, (urlBytes.length + 1), 0x55, 0x01];
        const bytes = [...headerBytes, ...urlBytes];

        this.setState({isWriting: true});
        NfcManager.requestNdefWrite(bytes)
            .then(() => console.log('write completed'))
            .catch(err => console.warn(err))
            .then(() => this.setState({isWriting: false}));
    }

    _cancelNdefWrite = () => {
        this.setState({isWriting: false});
        NfcManager.cancelNdefWrite()
            .then(() => console.log('write cancelled'))
            .catch(err => console.warn(err))
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
        let url = this._parseUri(tag);
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

    _stopDetection = () => {
        NfcManager.unregisterTagEvent()
            .then(result => {
                console.log('unregisterTagEvent OK', result)
            })
            .catch(error => {
                console.warn('unregisterTagEvent fail', error)
            })
    }

    _clearMessages = () => {
        this.setState({tag: null});
    }

    _goToNfcSetting = () => {
        if (Platform.OS === 'android') {
            NfcManager.goToNfcSetting()
                .then(result => {
                    console.log('goToNfcSetting OK', result)
                })
                .catch(error => {
                    console.warn('goToNfcSetting fail', error)
                })
        }
    }
>>>>>>> parent of 82628c2... not working, pre-new nfc lib

export default class NfcSample extends Component {
  readTagId() {
    getTagId()
  }

  readTagData() {
    readTag([
      { sector: 1, blocks: [1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
      { sector: 2, blocks: [0,1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
      { sector: 3, blocks: [0], clave: 'FFFFFFFFFFFF', keyType: 'A' }
    ])
  }

  writeTagData() {
    writeTag([{ sector: 1, blocks: [ 
    { index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
    { index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
      clave: 'FFFFFFFFFFFF', keyType: 'A' },
      { sector: 2, blocks: [ 
    { index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
    { index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
    { index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
      clave: 'FFFFFFFFFFFF', keyType: 'A' },
    { sector: 3, blocks: [ 
    { index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
      clave: 'FFFFFFFFFFFF', keyType: 'A' },
      ], 1148002313)
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onTagError', function (e) {
        console.log('error', e)
        Alert.alert(JSON.stringify(e))
    })

    DeviceEventEmitter.addListener('onTagDetected', function (e) {
        Alert.alert(JSON.stringify(e))
    })

    DeviceEventEmitter.addListener('onTagRead', (e) => {
        console.log('reading', e)
        Alert.alert(JSON.stringify(e))
    })

    DeviceEventEmitter.addListener('onTagWrite', (e) => {
        console.log('writing', e)
        Alert.alert(JSON.stringify(e))
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button
          onPress={this.readTagId}
          title="Get id of Tag"
        />
        <Button
          onPress={this.readTagData}
          title="Get sectors of a Tag"
        />
        <Button
          onPress={this.writeTagData}
          title="Write sectors of a Tag"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('NfcSample', () => NfcSample);