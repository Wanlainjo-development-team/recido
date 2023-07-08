import React, { useLayoutEffect, useState, useEffect } from 'react'

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
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
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
import InvoiceSearchConfig from '../screens/invoices/config'
import ViewCustomer from '../screens/customer/screens/viewCustomer'
import AddContact from '../screens/customer/screens/addContact'
import AddInventory from '../screens/inventory/screens/addInventory'
import BussinessDetails from '../screens/settings/screens/bussinessDetails'
import Information from '../screens/settings/screens/information'

import Templates from '../screens/settings/screens/template'
import DefaultNotes from '../screens/settings/screens/notes'
import DefaultEmailMessage from '../screens/settings/screens/emailMessage'
import About from '../screens/settings/screens/about'
import TermsOfUse from '../screens/settings/screens/terms'
import PrivacyPolicy from '../screens/settings/screens/privacyPolicy'
import Tax from '../screens/settings/screens/tax'
import Customize from '../screens/settings/screens/customize'
import Archive from '../screens/archive'
import Currency from '../screens/currency'

import { setArchiveList, setContactArchiveList, setInventoryArchiveList } from '../features/useFormSlice'
import { setInventoryList } from '../features/inventorySlice'
import { setCustomersList } from '../features/customerSlice'
import Welcome from '../screens/auth/Welcome'

import * as _Contacts from 'expo-contacts'
import * as Notifications from 'expo-notifications';

const StackNavigator = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { user, auth } = useSelector(state => state.user)

    const [loadingInitial, setLoadingInitial] = useState(true)

    const storeData = async () => {
        const value = await AsyncStorage.getItem('recido_user')

        if (value) {
            await dispatch(setAuth(value))
            await getUser(JSON.parse(value))

            setLoadingInitial(false)
        } else {
            dispatch(setAuth(null))
            setLoadingInitial(false)
        }
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

    useEffect(() => {
        checkPermissions();
    }, []);

    const checkPermissions = async () => {
        const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
        const { status: contactStatus } = await _Contacts.requestPermissionsAsync();

        if (notificationStatus !== 'granted' || contactStatus !== 'granted') {
            Alert.alert(
                'Permissions Required',
                'Please grant the necessary permissions to use this app.',
                [
                    {
                        text: 'Grant Permissions',
                        onPress: () => {
                            Notifications.requestPermissionsAsync();
                            _Contacts.requestPermissionsAsync();
                        },
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
                { cancelable: false }
            );
        }
    };

    useEffect(() => {
        (async () => {

            try {
                const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

                let q = query(collection(db, "users", id, 'inventory'), orderBy('name', 'asc'))

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let inventory = []
                    querySnapshot.forEach((doc) => {
                        inventory.push({
                            inventoryId: doc.id,
                            ...doc.data()
                        })
                    })
                    dispatch(setInventoryList(inventory))
                })

                return unsubscribe
            } catch (error) {

            }

        })()
    }, [db])

    useEffect(() => {
        (async () => {

            try {
                const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

                let q = query(collection(db, "users", id, 'customers'), orderBy('name', 'asc'))

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    let customers = []
                    querySnapshot.forEach((doc) => {
                        customers.push({
                            customerId: doc.id,
                            ...doc.data()
                        })
                    })
                    dispatch(setCustomersList(customers))
                })

                return unsubscribe
            } catch (error) {

            }

        })()
    }, [db])

    useEffect(() => {
        (async () => {
            try {
                const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

                const q = collection(db, "users", id, 'archive')
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const customer = [];
                    querySnapshot.forEach((doc) => {
                        customer.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    dispatch(setArchiveList(customer))
                });
            } catch (error) {

            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

                const q = collection(db, "users", id, 'inventoryArchive')
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const cities = [];
                    querySnapshot.forEach((doc) => {
                        cities.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    dispatch(setInventoryArchiveList(cities))
                });
            } catch (error) {

            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

                const q = collection(db, "users", id, 'customerArchive')
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const contact = [];
                    querySnapshot.forEach((doc) => {
                        contact.push({
                            ...doc.data(),
                            contactId: doc.id
                        });
                    });
                    dispatch(setContactArchiveList(contact))
                });
            } catch (error) {

            }
        })()
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
                loadingInitial ?
                    <Screen name='Splash' component={Splash} options={{ gestureEnabled: false }} /> :

                    <>
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
                                    <Screen name='ViewCustomer' component={ViewCustomer} options={{ gestureEnabled: true }} />
                                    <Screen name='AddContact' component={AddContact} options={{ gestureEnabled: true }} />
                                    <Screen name='AddInventory' component={AddInventory} options={{ gestureEnabled: true }} />
                                    <Screen name='BussinessDetails' component={BussinessDetails} options={{ gestureEnabled: true }} />
                                    <Screen name='Information' component={Information} options={{ gestureEnabled: true }} />
                                    <Screen name='Templates' component={Templates} options={{ gestureEnabled: true }} />
                                    <Screen name='Tax' component={Tax} options={{ gestureEnabled: true }} />
                                    <Screen name='DefaultNotes' component={DefaultNotes} options={{ gestureEnabled: true }} />
                                    <Screen name='DefaultEmailMessage' component={DefaultEmailMessage} options={{ gestureEnabled: true }} />
                                    <Screen name='About' component={About} options={{ gestureEnabled: true }} />
                                    <Screen name='TermsOfUse' component={TermsOfUse} options={{ gestureEnabled: true }} />
                                    <Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ gestureEnabled: true }} />
                                    <Screen name='Customize' component={Customize} options={{ gestureEnabled: true }} />
                                    <Screen name='Archive' component={Archive} options={{ gestureEnabled: true }} />
                                    <Screen name='Currency' component={Currency} options={{ gestureEnabled: true }} />
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
                                        <Screen name='InvoiceSearchConfig' component={InvoiceSearchConfig} options={{ gestureEnabled: true }} />
                                    </Group>

                                </>
                            ) : (
                                <Group>
                                    <Screen name="Welcome" component={Welcome} options={{ gestureEnabled: false }} />
                                    <Screen name="Signin" component={Signin} options={{ gestureEnabled: false }} />
                                    <Screen name="Signup" component={Signup} options={{ gestureEnabled: true }} />
                                    <Screen name="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: true }} />
                                </Group>
                            )
                        }
                    </>
            }
        </Navigator>
    )
}

export default StackNavigator