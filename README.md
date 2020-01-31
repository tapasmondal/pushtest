# React Native IBM Push Sample
This is a React-Native Sample Application for demonstrating usage of IBM Push Notifications.

Checkout this link to know more:
[Notifications - IBM Mobile Foundation Developer Center](http://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/)

## Setting up the Sample
1. Get into the project directory:
 `cd PushReactNative`
2. Install the project dependencies:
 `npm install`
3. Register the app with your MFP Server:
 `cd android` OR `cd ios`
followed by command,
`mfpdev app register`

*NOTE:* Make sure the app in MFP Console has security scope element: *push.mobileclient* set (for android) and FCM credentials are correctly put under *Push Settings*.
4. Replace *google-services.json*:
- Download the *google-services.json* from Firebase App Console. Follow the [Getting Started](http://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/) guide for more info.
- Put it under directory android/app/

## Running the Sample

For android: 
`react-native run-android` 

For iOS:
`react-native run-ios`

## Understanding the Sample
##### Initializing the MFP Push Service:
To initialize the service, we call the following method
> MFPPush.initialize();
This has to be called each time the app opens, before you start interacting with other Push APIs.

##### Registering device with MFP Server:
```
MFPPush.registerDevice().then(data => {
	// success 
}).catch(err => {
	// failure
})
```

##### Fetching available Tags for subscription:
```
MFPPush.getTags().then(data => {
	// success — data is an array of available tags
}).catch(err => {
	// failure
});
```


##### Subscribing to Tags:
```
MFPPush.subscribe(['tag1', 'tag2']).then(data => {
 	// success
}).catch(err => {
 	// failure
});
```

##### Registering Notifications Callback:
This is important. Registering a callback will let the app be notified whenever any notification arrives. You do this by calling the api

`MFPPush.registerNotificationsCallback(“myCallBack”);`

This is just half the story. This step instructs the MFPPush SDK that whenever a notification is received, forward it to `myCallBack` Event Listener. 

Now we will implement the Listener named “myCallBack” in our app. Check out the following code for this,
```
DeviceEventEmitter.addListener(“myCallBack”, function(event) {
  var notification = new MFPSimplePushNotification(event);
  Alert.alert(notification.getAlert());
});
```
