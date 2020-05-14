import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer} from '@react-navigation/native'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'





const Stack = createStackNavigator();
export default class AuthenticationFlow extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Loading">
                    <Stack.Screen name="Loading" component={LoadingScreen} options={{ title: 'Loading...' }} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Page' }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login Page' }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}