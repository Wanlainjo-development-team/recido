import React, { useLayoutEffect, useState } from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Splash from './Splash'
import Signin from '../screens/auth/Signin'
import Signup from '../screens/auth/Signup'
import ForgotPassword from '../screens/auth/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'

const { Navigator, Screen, Group } = createStackNavigator()

import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomNavigation from './CustomNavigation'

import { setAuth, setProfile } from '../features/userSlice'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../hooks/firebase'

const StackNavigator = () => {
    const dispatch = useDispatch()

    const { user, loadingInitial, auth } = useSelector(state => state.user)

    const storeData = async () => {
        const value = await AsyncStorage.getItem('recido_user')
        dispatch(setAuth(value))
    }

    const getUser = async (prop) => {
        const unsub = onSnapshot(doc(db, 'users', prop), doc => {
            // console.log('current data', doc.data())
            dispatch(setProfile(doc.data()))
        })

        return unsub
    }

    useLayoutEffect(() => {
        storeData()
    }, [])

    useLayoutEffect(() => {
        let _auth = JSON.parse(auth)?.user?.uid
        getUser(_auth)
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