import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Splash from './Splash'
import Signin from '../screens/auth/Signin'
import Signup from '../screens/auth/Signup'
import ForgotPassword from '../screens/auth/ForgotPassword'
import Navigation from './Navigation'
import { useSelector } from 'react-redux'

const { Navigator, Screen, Group } = createStackNavigator()

const StackNavigator = () => {
    const { user, loadingInitial } = useSelector(state => state.user)

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                keyboardHandlingEnabled: true,
                animationEnabled: true,
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            {
                user ? (
                    <Screen name="Navigation" component={Navigation} options={{ gestureEnabled: false }} />
                ) : (
                    <Group>
                        <Screen name="Signin" component={Signin} options={{ gestureEnabled: false }} />
                        <Screen name="Signup" component={Signup} options={{ gestureEnabled: true }} />
                        <Screen name="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: true }} />
                    </Group>
                )
            }
        </Navigator>
    )
}

export default StackNavigator