import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { addNewCustomer, billTo } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import allCountries from '../../../../../components/fragments/countries'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceContact } from '../../../../../features/useFormSlice'
import color from '../../../../../style/color'
import * as Contacts from 'expo-contacts'
import { AntDesign } from '@expo/vector-icons';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../../hooks/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddNewCustomer = () => {
    const { goBack, navigate } = useNavigation()
    const { directSave, invoiceContact } = useRoute().params

    const dispatch = useDispatch()

    const [showMoreOptions, setSHowMoreOptions] = useState(false)

    const { country, shippingCountry, city, state, zip, invoiceId } = useSelector(state => state.form)

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
            setContact({
                ...contact,
                ...invoiceContact,
                name: invoiceContact?.name,
                phone: invoiceContact?.phoneNumbers[0].number
            })
        })()
    }, [])

    const addContact = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

        const querySnapshot = await getDocs(query(collection(db, "users", id, 'customers'), where("name", "==", contact?.name)))

        if (directSave) {
            if (querySnapshot.docs.length >= 1) {
                Alert.alert('This contact already exists in your contact list 😕😕')
            } else {
                await addDoc(collection(db, 'users', id, 'customers'), {
                    ...contact,
                    ...invoiceContact,
                    invoiceId,
                    city,
                    state,
                    zip,
                    country,
                })

                Alert.alert(`${contact.name} has been added to your contact successfully 🎉🎉`)
            }
        } else {
            // dispatch(setInvoiceContact({
            //     ...contact,
            //     ...invoiceContact,
            //     name: contact.name,
            //     email: contact.email,
            //     phone: contact.phone,
            //     taxReg: contact.taxReg,
            //     additionalInfo: contact.additionalInfo,
            //     address: contact.address,
            //     city: contact.city,
            //     state: contact.state,
            //     zip: contact.zip,
            //     country: contact.country,
            //     shippingAddress: contact.shippingAddress,
            //     shippingCity: contact.shippingCity,
            //     shippingState: contact.shippingState,
            //     shippingZip: contact.shippingZip,
            //     shippingCountry: contact.shippingCountry
            // }))
            // goBack()
        }
    }

    const openContact = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
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
                <View style={addNewCustomer.head}>
                    <TouchableOpacity onPress={goBack}>
                        <Text style={addNewCustomer.headText}>Back</Text>
                    </TouchableOpacity>
                    <Text>👨‍🦱 Create a new contact</Text>
                    <TouchableOpacity onPress={addContact}>
                        <Text style={addNewCustomer.headText}>Add</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={openContact} style={billTo.group}>
                    <AntDesign name="contacts" size={22} color={color.accent} />
                    <Text style={billTo.groupText}>Import from your contact</Text>
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                        placeholder='Name'
                        style={addNewCustomer.input}
                        value={contact.name}
                        onChangeText={text => {
                            setContact({
                                ...contact,
                                name: text
                            })
                        }}
                    />
                    <TextInput
                        placeholder='Email'
                        style={addNewCustomer.input}
                        value={contact.email}
                        onChangeText={text => {
                            setContact({
                                ...contact,
                                email: text
                            })
                        }}
                    />
                    <TextInput
                        placeholder='Phone number'
                        style={addNewCustomer.input}
                        keyboardType='phone-pad'
                        value={contact.phone}
                        onChangeText={text => {
                            setContact({
                                ...contact,
                                phone: text
                            })
                        }}
                    />
                    <TextInput
                        placeholder='Tax Reg No'
                        style={addNewCustomer.input}
                        value={contact.taxReg}
                        onChangeText={text => {
                            setContact({
                                ...contact,
                                taxReg: text
                            })
                        }}
                    />

                    {
                        !showMoreOptions ?
                            <TouchableOpacity onPress={() => setSHowMoreOptions(true)} style={addNewCustomer.showMoreOptionsButton}>
                                <Text style={addNewCustomer.showMoreOptionsButtonText}>Show more options</Text>
                            </TouchableOpacity> :
                            <>
                                <TextInput
                                    placeholder='Additional information'
                                    style={addNewCustomer.input}
                                    value={contact.additionalInfo}
                                    onChangeText={text => {
                                        setContact({
                                            ...contact,
                                            additionalInfo: text
                                        })
                                    }}
                                />

                                <Text style={addNewCustomer.opacityText}>Address</Text>
                                <TextInput
                                    placeholder='Address'
                                    style={addNewCustomer.input}
                                    value={contact.address}
                                    onChangeText={text => {
                                        setContact({
                                            ...contact,
                                            address: text
                                        })
                                    }}
                                />

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <TextInput
                                        placeholder='City'
                                        style={addNewCustomer.shortInput}
                                        value={contact.city}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                city: text
                                            })
                                        }}
                                    />
                                    <TextInput
                                        placeholder='State'
                                        style={addNewCustomer.shortInput}
                                        value={contact.state}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                state: text
                                            })
                                        }}
                                    />
                                    <TextInput
                                        placeholder='Zip'
                                        style={addNewCustomer.shortInput}
                                        value={contact.zip}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                zip: text
                                            })
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => navigate('Countries', { typeOfAddress: 'address', allCountries })} style={{ ...addNewCustomer.shortInput, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '600', opacity: 0.2 }}>{country != '' ? country : 'Country'}</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={addNewCustomer.opacityText}>Shipping Address</Text>
                                <TextInput
                                    placeholder='Address'
                                    style={addNewCustomer.input}
                                    value={contact.shippingAddress}
                                    onChangeText={text => {
                                        setContact({
                                            ...contact,
                                            shippingAddress: text
                                        })
                                    }}
                                />

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <TextInput
                                        placeholder='City'
                                        style={addNewCustomer.shortInput}
                                        value={contact.shippingCity}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                shippingCity: text
                                            })
                                        }}
                                    />
                                    <TextInput
                                        placeholder='State'
                                        style={addNewCustomer.shortInput}
                                        value={contact.shippingState}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                shippingState: text
                                            })
                                        }}
                                    />
                                    <TextInput
                                        placeholder='Zip'
                                        style={addNewCustomer.shortInput}
                                        value={contact.shippingZip}
                                        onChangeText={text => {
                                            setContact({
                                                ...contact,
                                                shippingZip: text
                                            })
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => navigate('Countries', { typeOfAddress: 'shipping address', allCountries })} style={{ ...addNewCustomer.shortInput, justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '600', opacity: 0.2 }}>{shippingCountry != '' ? shippingCountry : 'Country'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                    }
                </ScrollView>
            </View>
        </KeyboardAvoidingView >
    )
}

export default AddNewCustomer