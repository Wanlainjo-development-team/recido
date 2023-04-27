import React, { useLayoutEffect, useState } from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Splash from './Splash'
import Signin from '../screens/auth/Signin'
import Signup from '../screens/auth/Signup'
import ForgotPassword from '../screens/auth/ForgotPassword'
import { useSelector } from 'react-redux'

const { Navigator, Screen, Group } = createStackNavigator()

import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomNavigation from './CustomNavigation'

const StackNavigator = () => {
    const { user, loadingInitial } = useSelector(state => state.user)

    const [auth, setAuth] = useState(false)

    const storeData = async () => {
        const value = await AsyncStorage.getItem('recido_user')
        setAuth(value)
    }

    useLayoutEffect(() => {
        storeData()
    }, [])

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
                (auth || user) ? (
                    <Screen name="CustomNavigation" component={CustomNavigation} options={{ gestureEnabled: false }} />
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