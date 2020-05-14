
import React, { Component, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, Button } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { web } from './credentials.json'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            photo: null,
            email: '',
        }

    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Go to Details"
                    // navigate means go to this route
                    onPress={() => this.props.navigation.navigate('Details', {
                        itemId: 86,
                        otherParams: 'anything',
                    })}
                />
                <GoogleSigninButton
                    style={{ width: 192, height: 72 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                />
                <Text>{this.state.name}</Text>
                <Text>{this.state.email}</Text>
                <Image source={{ uri: this.state.photo }} style={{ height: 80, width: 80 }}></Image>
            </View>
        )
    }

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/photoslibrary'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: web.client_id, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.user.name)
            // this.setState({ userInfo });
            this.setState({
                name: userInfo.user.name,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
                idToken: userInfo.idToken //get the user idToken
            })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            console.log(error)
        }
    }
}
class DetailScreen extends Component {

    render() {
        const { itemId, otherParams } = this.props.route.params
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParams)}</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() =>
                        this.props.navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })
                    }
                />
                <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
                {/* <Button
                    title="Go back to first screen in stack"
                    // go back to the first screen in stack
                    onPress={() => this.props.navigation.popToTop()}
                /> */}
            </View>
        );
    }
}
const Stack = createStackNavigator();
export default class GoogleApiTest extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    {/* initial route is Home */}
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Login' }} />
                    <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Interact' }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}