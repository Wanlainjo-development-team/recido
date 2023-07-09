import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { contact } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setCountry, setShippingCountry } from '../../../../../features/useFormSlice'
import app from '../../../../../style/app'
import color from '../../../../../style/color'

const Countries = () => {
    const { goBack } = useNavigation()
    const { typeOfAddress, allCountries } = useRoute().params
    const dispatch = useDispatch()

    const { country } = useSelector(state => state.form)
    const { theme } = useSelector(state => state.user)

    const setContact = prop => {
        if (typeOfAddress == 'address') {
            dispatch(setCountry(prop))
            if (country != '') goBack()
        }
        else {
            dispatch(setShippingCountry(prop))
            goBack()
        }
    }

    return (
        <View style={{ ...contact.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={app.head}>
                <Text style={{ ...app.title1, color: theme ? color.white : color.dark }}>Select your country</Text>
                <TouchableOpacity onPress={goBack} style={app.doneButton}>
                    <Text style={app.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={allCountries}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => setContact(item)} style={{ ...contact.group, borderBottomWidth: (index + 1) == allCountries.length ? 0 : 1 }}>
                        <Text style={{ color: theme ? color.white : color.dark }}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Countries