import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { contact } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setCountry, setShippingCountry } from '../../../../../features/useFormSlice'

const Countries = () => {
    const { goBack } = useNavigation()
    const { typeOfAddress, allCountries } = useRoute().params
    const dispatch = useDispatch()

    const { country } = useSelector(state => state.form)

    const setContact = prop => {
        if (typeOfAddress == 'address') {
            dispatch(setCountry(prop))
            if (country != '') goBack()
        }
        else {
            dispatch(setShippingCountry(prop))
            if (country != '') goBack()
        }
    }

    return (
        <View style={contact.container}>
            <View style={contact.head}>
                <View />
                <Text>Select your country</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={contact.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={allCountries}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setContact(item)} style={contact.group}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Countries