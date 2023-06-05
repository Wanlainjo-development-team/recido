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
import BillTo from '../screens/create/screens/createInvoice/screens/BillTo'
import Contacts from '../screens/create/screens/createInvoice/screens/Contacts'
import AddNewCustomer from '../screens/create/screens/createInvoice/screens/AddNewCustomer'
import Countries from '../screens/create/screens/createInvoice/screens/Countries'
import Items from '../screens/create/screens/createInvoice/screens/Items'
import CreateItem from '../screens/create/screens/createInvoice/screens/CreateItem'
import Note from '../screens/create/screens/createInvoice/screens/Note'

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
                        <Screen name='BillTo' component={BillTo} options={{ gestureEnabled: true }} />
                        <Screen name='Contacts' component={Contacts} options={{ gestureEnabled: true }} />
                        <Screen name='AddNewCustomer' component={AddNewCustomer} options={{ gestureEnabled: true }} />
                        <Screen name='Countries' component={Countries} options={{ gestureEnabled: true }} />
                        <Screen name='Items' component={Items} options={{ gestureEnabled: true }} />
                        <Screen name='CreateItem' component={CreateItem} options={{ gestureEnabled: true }} />
                        <Screen name='Note' component={Note} options={{ gestureEnabled: true }} />
                        <Group
                            screenOptions={{
                                ...TransitionPresets.ModalSlideFromBottomIOS,
                                presentation: 'transparentModal',
                                headerStatusBarHeight: 0, // Set the header status bar height to 0 to hide it
                                headerStyleInterpolator: ({ current }) => ({
                                    containerStyle: {
                                        opacity: current.progress, // Fade out the screen based on the progress of the gesture
                                    },
                                }),
                            }}
                        >
                            <Screen name='SelectTemplate' component={SelectTemplate} options={{ gestureEnabled: true }} />
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