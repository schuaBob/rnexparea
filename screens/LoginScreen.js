import * as React from 'react'
import { View, Text } from 'react-native'
import { web } from '../credentials.json'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{this.state.message}</Text>
                <GoogleSigninButton
                    style={{ width: 192, height: 72 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                />
            </View>
        )
    }
    componentDidMount() {
        console.log("rendered")
        this._signInSilently()
            .then((user) => {
                if(user) {
                    this.props.navigation.replace('Home', { userInfo: user })
                } else {
                    this.setState({message:'Need Login'})
                }
            })
    }
    _signInSilently = async () => {
        try {
            return await GoogleSignin.signInSilently();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                return false
            } else {
                console.log(error)
            }
        }
    };
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.props.navigation.replace('Home',{userInfo:userInfo})
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
        }
    };
}