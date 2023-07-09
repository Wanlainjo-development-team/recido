import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert, FlatList, PermissionsAndroid } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { addNewCustomer, billTo } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import allCountries from '../../../../../components/fragments/countries'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceContact } from '../../../../../features/useFormSlice'
import color from '../../../../../style/color'
import * as Contacts from 'expo-contacts'
import { AntDesign } from '@expo/vector-icons';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../../../../../hooks/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import app from '../../../../../style/app'
// import * as Linking from 'expo-linking'
import { Linking } from 'expo'

const AddNewCustomer = () => {
    const { goBack, navigate } = useNavigation()
    const { directSave, invoiceContact } = useRoute().params

    const dispatch = useDispatch()

    const [showMoreOptions, setSHowMoreOptions] = useState(false)

    const { country, shippingCountry, city, state, zip, invoiceId } = useSelector(state => state.form)
    const { customersList } = useSelector(state => state.customer)

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        taxReg: '',
        additionalInfo: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: ''
    })


    useLayoutEffect(() => {
        (() => {
            if (invoiceContact == undefined) return

            // console.log(invoiceContact.phone)
            setContact({
                ...contact,
                ...invoiceContact,
                name: invoiceContact?.name,
                phone: invoiceContact?.phoneNumbers == undefined ? invoiceContact?.phone : invoiceContact?.phoneNumbers[0].number
            })
        })()
    }, [])

    const addContact = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        const querySnapshot = await getDocs(query(collection(db, "users", id, 'customers'), where("name", "==", contact?.name)))

        let defaultAction = () => {
            dispatch(setInvoiceContact({
                ...contact,
                ...invoiceContact,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                taxReg: contact.taxReg,
                additionalInfo: contact.additionalInfo,
                address: contact.address,
                city: contact.city,
                state: contact.state,
                zip: contact.zip,
                country: contact.country,
                shippingAddress: contact.shippingAddress,
                shippingCity: contact.shippingCity,
                shippingState: contact.shippingState,
                shippingZip: contact.shippingZip,
                shippingCountry: contact.shippingCountry
            }))
            goBack()
        }

        if (querySnapshot.docs.length >= 1) {
            defaultAction()
        } else {
            Alert.alert('Add new customer', 'This customer is not in your list, would you like to add the?', [
                {
                    text: 'Save customer',
                    onPress: async () => {
                        await addDoc(collection(db, 'users', id, 'customers'), {
                            ...invoiceContact,
                            ...contact,
                            invoiceId,
                            city,
                            state,
                            zip,
                            country,
                            createdAt: serverTimestamp()
                        })

                        Alert.alert(`${contact.name} has been added to your contact successfully 🎉🎉`)
                        defaultAction()
                    }
                },
                {
                    text: 'Proceed without saving',
                    onPress: () => {
                        defaultAction()
                    }
                },
                {
                    text: 'Cancel',
                    style: 'destructive'
                }
            ])
        }
    }


    const openContact = async () => {
        const { status } = await Contacts.getPermissionsAsync();

        console.log(status)
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync();

            if (data.length > 0) {
                const contact = data;

                navigate('Contacts', { allContact: contact, directSave: false })
            }
        }
    }

    return (
        <KeyboardAvoidingView style={addNewCustomer.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={addNewCustomer.container}>
                <View style={app.head}>
                    <TouchableOpacity onPress={goBack} style={app.backButton}>
                        <Text style={app.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={app.title1}>👨‍🦱 Create a new contact</Text>
                    <TouchableOpacity onPress={addContact} style={app.doneButton}>
                        <Text style={app.doneButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {
                    !directSave &&
                    <TouchableOpacity onPress={openContact} style={{ ...billTo.group, paddingHorizontal: 0 }}>
                        <AntDesign name="contacts" size={22} color={color.accent} />
                        <Text style={billTo.groupText}>Import from your contact</Text>
                    </TouchableOpacity>
                }

                <View>
                    {
                        customersList?.length >= 1 &&
                        <FlatList
                            data={customersList}
                            keyExtractor={(item, index) => index}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setContact({ ...contact, ...item })
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: `${color.accent}30`,
                                        marginRight: 10,
                                        borderRadius: 12,
                                        padding: 5,
                                        height: Platform.OS == 'android' ? 50 : null
                                    }}
                                >
                                    <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: `${color.accent}90` }}>
                                        <Text style={{ color: color.white, fontWeight: '900', fontSize: 25 }}>{item?.name.charAt(0)}</Text>
                                    </View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', marginHorizontal: 10, color: color.accent }}>{item?.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    }
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ ...app.title2, marginBottom: 20, marginTop: 40 }}>Contact Information</Text>

                    <View style={app.inputView}>
                        <Text style={app.inputText}>Name</Text>
                        <TextInput
                            placeholder='Name'
                            style={app.input}
                            value={contact.name}
                            onChangeText={text => {
                                setContact({
                                    ...contact,
                                    name: text
                                })
                            }}
                        />
                    </View>
                    <View style={app.inputView}>
                        <Text style={app.inputText}>Email</Text>
                        <TextInput
                            placeholder='Email'
                            autoComplete='email'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            style={app.input}
                            value={contact.email}
                            onChangeText={text => {
                                setContact({
                                    ...contact,
                                    email: text
                                })
                            }}
                        />
                    </View>
                    <View style={app.inputView}>
                        <Text style={app.inputText}>Phone number</Text>
                        <TextInput
                            placeholder='Phone number'
                            style={app.input}
                            keyboardType='phone-pad'
                            value={contact.phone}
                            onChangeText={text => {
                                setContact({
                                    ...contact,
                                    phone: text
                                })
                            }}
                        />
                    </View>
                    <View style={app.inputView}>
                        <Text style={app.inputText}>Tax Reg No</Text>
                        <TextInput
                            placeholder='Tax Reg No'
                            style={app.input}
                            value={contact.taxReg}
                            onChangeText={text => {
                                setContact({
                                    ...contact,
                                    taxReg: text
                                })
                            }}
                        />
                    </View>

                    {
                        !showMoreOptions ?
                            <TouchableOpacity onPress={() => setSHowMoreOptions(true)} style={addNewCustomer.showMoreOptionsButton}>
                                <Text style={addNewCustomer.showMoreOptionsButtonText}>Show more options</Text>
                            </TouchableOpacity> :
                            <>
                                <View style={app.inputView}>
                                    <Text style={app.inputText}>Additional information</Text>
                                    <TextInput
                                        placeholder='Additional information'
                                        style={app.input}
                                        value={contact.additionalInfo}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                additionalInfo: text
                                            })
                                        }}
                                    />
                                </View>

                                <Text style={{ ...app.title2, marginBottom: 20, marginTop: 40 }}>Address</Text>

                                <View style={app.inputView}>
                                    <Text style={app.inputText}>Address</Text>
                                    <TextInput
                                        placeholder='Address'
                                        style={app.input}
                                        value={contact.address}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                address: text
                                            })
                                        }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>City</Text>
                                        <TextInput
                                            placeholder='City'
                                            style={app.input}
                                            value={contact.city}
                                            onChangeText={text => {
                                                setContact({
                                                    ...contact,
                                                    city: text
                                                })
                                            }}
                                        />
                                    </View>

                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>State</Text>
                                        <TextInput
                                            placeholder='State'
                                            style={app.input}
                                            value={contact.state}
                                            onChangeText={text => {
                                                setContact({
                                                    ...contact,
                                                    state: text
                                                })
                                            }}
                                        />
                                    </View>
                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>State</Text>
                                        <TextInput
                                            placeholder='State'
                                            style={app.input}
                                            value={contact.zip}
                                            onChangeText={text => {
                                                setContact({
                                                    ...contact,
                                                    zip: text
                                                })
                                            }}
                                        />
                                    </View>
                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>Country</Text>
                                        <TouchableOpacity onPress={() => navigate('Countries', { typeOfAddress: 'address', allCountries })} style={{ ...app.input, justifyContent: 'center' }}>
                                            <Text style={country != '' ? { fontWeight: '600' } : { fontWeight: '600', opacity: .2 }}>{country != '' ? country : 'Country'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={{ ...app.title2, marginBottom: 20, marginTop: 40 }}>Shipping Address</Text>

                                <View style={app.inputView}>
                                    <Text style={app.inputText}>Address</Text>
                                    <TextInput
                                        placeholder='Address'
                                        style={app.input}
                                        value={contact.shippingAddress}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                shippingAddress: text
                                            })
                                        }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>City</Text>
                                        <TextInput
                                            placeholder='City'
                                            style={app.input}
                                            value={contact.shippingCity}
                                            onChangeText={text => {
                                                setContact({
                                                    ...contact,
                                                    shippingCity: text
                                                })
                                            }}
                                        />
                                    </View>

                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>State</Text>
                                        <TextInput
                                            placeholder='State'
                                            style={app.input}
                                            value={contact.shippingState}
                                            onChangeText={text => {
                                                setContact({
                                                    ...contact,
                                                    shippingState: text
                                                })
                                            }}
                                        />
                                    </View>

                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>Zip</Text>
                                        <TextInput
                                            placeholder='Zip'
                                            style={app.input}
                                            value={contact.shippingZip}
                                            onChangeText={text => {
                                                setContact({
                                                    ...contact,
                                                    shippingZip: text
                                                })
                                            }}
                                        />
                                    </View>

                                    <View style={{ ...app.inputView, width: '45%' }}>
                                        <Text style={app.inputText}>Country</Text>
                                        <TouchableOpacity onPress={() => navigate('Countries', { typeOfAddress: 'shipping address', allCountries })} style={{ ...app.input, justifyContent: 'center' }}>
                                            <Text style={shippingCountry != '' ? { fontWeight: '600' } : { fontWeight: '600', opacity: 0.2 }}>{shippingCountry != '' ? shippingCountry : 'Country'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                    }
                </ScrollView>
            </View>
        </KeyboardAvoidingView >
    )
}

export default AddNewCustomer