import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { addNewCustomer } from './styles'
import { useNavigation } from '@react-navigation/native'
import allCountries from '../../../../../components/fragments/countries'

const AddNewCustomer = () => {
    const { goBack, navigate } = useNavigation()

    const [showMoreOptions, setSHowMoreOptions] = useState(false)

    return (
        <View style={addNewCustomer.container}>
            <View style={addNewCustomer.head}>
                <View />
                <Text>👨‍🦱 Create a new contact</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={addNewCustomer.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={addNewCustomer.scrollView}>
                <TextInput placeholder='Name' style={addNewCustomer.input} />
                <TextInput placeholder='Email' style={addNewCustomer.input} />
                <TextInput placeholder='Phone number' style={addNewCustomer.input} />
                <TextInput placeholder='Tax Reg No' style={addNewCustomer.input} />

                {
                    !showMoreOptions ?
                        <TouchableOpacity onPress={() => setSHowMoreOptions(true)} style={addNewCustomer.showMoreOptionsButton}>
                            <Text style={addNewCustomer.showMoreOptionsButtonText}>Show more options</Text>
                        </TouchableOpacity> :
                        <>
                            <TextInput placeholder='Additional information' style={addNewCustomer.input} />

                            <Text style={addNewCustomer.opacityText}>Address</Text>
                            <TextInput placeholder='Address' style={addNewCustomer.input} />

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <TextInput placeholder='City' style={addNewCustomer.shortInput} />
                                <TextInput placeholder='State' style={addNewCustomer.shortInput} />
                                <TextInput placeholder='Zip' style={addNewCustomer.shortInput} />
                                <TouchableOpacity onPress={() => navigate('Countries', { typeOfAddress: 'address', allCountries })} style={{ ...addNewCustomer.shortInput, justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: '600', opacity: 0.2 }}>Country</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={addNewCustomer.opacityText}>Shipping Address</Text>
                            <TextInput placeholder='Address' style={addNewCustomer.input} />

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <TextInput placeholder='City' style={addNewCustomer.shortInput} />
                                <TextInput placeholder='State' style={addNewCustomer.shortInput} />
                                <TextInput placeholder='Zip' style={addNewCustomer.shortInput} />
                                <TouchableOpacity onPress={() => navigate('Countries', { typeOfAddress: 'shipping address', allCountries })} style={{ ...addNewCustomer.shortInput, justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: '600', opacity: 0.2 }}>Country</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
            </ScrollView>
        </View>
    )
}

export default AddNewCustomer