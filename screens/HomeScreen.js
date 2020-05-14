import * as React from 'react'
import { View, Text, Image, Button } from 'react-native'
import { GoogleSignin} from '@react-native-community/google-signin';
// 192.168.10.103
export default class HomeScreen extends React.Component {
    render() {
        const { userInfo } = this.props.route.params
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{userInfo.user.name}</Text>
                <Text>{userInfo.user.email}</Text>
                <Image source={{ uri: userInfo.user.photo }} style={{ height: 80, width: 80 }}></Image>
                <Button title="Logout" onPress={this._signOut}></Button>
            </View>
        )
    }
    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.props.navigation.replace('Login')
        } catch (error) {
            console.error(error);
        }
    };
}