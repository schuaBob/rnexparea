import * as React from 'react'
import { View, Text } from 'react-native'
import { web } from '../credentials.json'
import { GoogleSignin} from '@react-native-community/google-signin';

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    Loading..........
                </Text>
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
        this._isSignedIn()
        .then((y) => {
            return this._getCurrentUser(y)
        }).then((user) => {
            if(user){
                this.props.navigation.replace('Home',{userInfo:user})
            } else{
                this.props.navigation.replace('Login')
            }
        })

    }
    _isSignedIn = async () => {
        return await GoogleSignin.isSignedIn()
    };
    _getCurrentUser = async (y) => {
        if (y) {
            return await GoogleSignin.getCurrentUser();
        } else {
            return null
        }
    };
}