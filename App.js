/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView, DeviceEventEmitter, Alert} from 'react-native';
import {MFPPush, MFPSimplePushNotification} from 'react-native-ibm-mobilefirst-push'

const NOTIFICATION_CALLBACK_RECEIVER = 'NOTIFICATION_CALLBACK_RECEIVER';
const SUCCESS = 'SUCCESS\n';
const FAILURE = 'FAILURE\n';

DeviceEventEmitter.addListener(NOTIFICATION_CALLBACK_RECEIVER, function(event) {
  var notification = new MFPSimplePushNotification(event);
  Alert.alert(notification.getAlert());
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    };
    
    // views
    this.returnOperationDetailView = this.returnOperationDetailView.bind(this)
    
    // operations
    this.registerDevice = this.registerDevice.bind(this)
    this.unregisterDevice = this.unregisterDevice.bind(this)
    this.getSubscriptions = this.getSubscriptions.bind(this)
    this.getTags = this.getTags.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
  }
  
  registerDevice() {
    MFPPush.initialize();
    MFPPush.registerDevice().then(data => {
      MFPPush.registerNotificationsCallback(NOTIFICATION_CALLBACK_RECEIVER);
      this.setState({result: SUCCESS + 'Successfully registered device.'});
    }).catch(err => {
      this.setState({result: FAILURE + 'Failed to register device. ' + JSON.stringify(err)});
    })
  } 
  
  unregisterDevice() {
    MFPPush.unregisterDevice().then(data => {
      this.setState({result: SUCCESS + 'Successfully unregistered device'});
    }).catch(err => {
      this.setState({result: FAILURE + 'Failed to unregister device. ' + JSON.stringify(err)});
    });
  }

  getSubscriptions() {
    MFPPush.getSubscriptions().then(data => {
      var res = 'Successfully received device subscriptions: \n';
      res += JSON.stringify(data) + '\n';
      this.setState({result: SUCCESS + res});
    }).catch(err => {
      this.setState({result: FAILURE + 'Failed to get subscriptions. ' + JSON.stringify(err)});
    });
  }

  getTags() {
    MFPPush.getTags().then(data => {
      var res = 'Successfully received tags available for subscriptions: \n';
      res += JSON.stringify(data) + '\n';
      this.setState({result: SUCCESS + res});
    }).catch(err => {
      this.setState({result: FAILURE + 'Failed to get available tags for application. ' + JSON.stringify(err)});
    });
  }

  subscribe() {
    MFPPush.subscribe(['tag1', 'tag2']).then(data => {
      this.setState({result: SUCCESS + 'Successfully subscribed to tag1 and tag2.'});
    }).catch(err => {
      this.setState({result: FAILURE + 'Failed to subscribe to tag1 and tag2. ' + err});
    });
  }

  unsubscribe() {
    MFPPush.unsubscribe(['tag1', 'tag2']).then(data => {
      this.setState({result: SUCCESS + 'Successfully unsubscribed from tag1 and tag2.'});
    }).catch(err => {
      this.setState({result: FAILURE + 'Failed to unsubscribe from tag1 and tag2. ' + err});
    });
  }

  returnOperationDetailView() {
    return(
      <View>
          <View style={{width:'100%', padding:10}}>
            <Button title="Register Device" onPress={this.registerDevice} />
          </View>
          <View style={{width:'100%', padding:10}}>
            <Button title="Get Tags" onPress={this.getTags} />
          </View>
          <View style={{width:'100%', padding:10}}>
            <Button title="Subscribe" onPress={this.subscribe} />
          </View>
          <View style={{width:'100%', padding:10}}>
            <Button title="Get Subscriptions" onPress={this.getSubscriptions} />
          </View>
          <View style={{width:'100%', padding:10}}>
            <Button title="Unsubscribe" color='red' onPress={this.unsubscribe} />
          </View>
          <View style={{width:'100%', padding:10}}>
            <Button title="Unregister Device" color='red' onPress={this.unregisterDevice} />
          </View>
        </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>IBM MobileFirst Push</Text>
        <View style={styles.testItemsContainer}>
          {this.returnOperationDetailView()}
        </View>
        <View style={styles.testResultsContainer}>
          <ScrollView>
            <Text style={{color: 'white', fontSize:20, textAlign: 'center', marginVertical:5}}>RESULTS:</Text>
            <Text style={{color: 'white', fontSize:16, margin:10}}>{this.state.result}</Text>
          </ScrollView>
        </View>
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
  testItemsContainer: {
    height: '70%',
    width: '100%',
  },
  testResultsContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
});
