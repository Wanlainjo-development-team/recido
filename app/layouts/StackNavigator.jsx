import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Signin from '../screens/auth/Signin'
import Signup from '../screens/auth/Signup'
import Navigation from './Navigation'

const { Navigator, Screen, Group } = createStackNavigator()

const StackNavigator = () => {
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
            <Screen name="Signin" component={Signin} options={{ gestureEnabled: false }} />
            <Screen name="Signup" component={Signup} options={{ gestureEnabled: false }} />
            <Screen name="Navigation" component={Navigation} options={{ gestureEnabled: false }} />
        </Navigator>
    )
}

export default StackNavigator