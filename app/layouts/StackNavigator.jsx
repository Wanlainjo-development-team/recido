import React, { useLayoutEffect, useState } from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Splash from './Splash'
import Signin from '../screens/auth/Signin'
import Signup from '../screens/auth/Signup'
import ForgotPassword from '../screens/auth/ForgotPassword'
import Settings from '../screens/settings'

import { useDispatch, useSelector } from 'react-redux'

const { Navigator, Screen, Group } = createStackNavigator()

import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomNavigation from './CustomNavigation'

import { setAuth, setProfile } from '../features/userSlice'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../hooks/firebase'
import { useNavigation } from '@react-navigation/native'
import SelectTemplate from '../screens/selectTemplate'
import Create from '../screens/create'
import SetInvoice from '../screens/create/screens/createInvoice/screens/SetInvoice'

const StackNavigator = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { user, loadingInitial, auth } = useSelector(state => state.user)

    const storeData = async () => {
        const value = await AsyncStorage.getItem('recido_user')
        dispatch(setAuth(value))

        getUser(JSON.parse(value))
    }

    const getUser = (prop) => {
        let id = prop?.user?.uid

        const unsub = onSnapshot(doc(db, 'users', id), doc => {
            dispatch(setProfile(doc.data()))
            if (doc.data()?.setup == undefined) navigation.navigate('Settings')
        })

        return unsub
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
                    <>
                        <Screen name="CustomNavigation" component={CustomNavigation} options={{ gestureEnabled: false }} />

                        <Screen name='Settings' component={Settings} options={{ gestureEnabled: false }} />
                        <Screen name='Create' component={Create} options={{ gestureEnabled: true }} />
                        <Screen name='SetInvoice' component={SetInvoice} options={{ gestureEnabled: true }} />
                        <Group screenOptions={{ presentation: 'transparentModal' }}>
                            <Screen name='SelectTemplate' component={SelectTemplate} />
                        </Group>
                    </>
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