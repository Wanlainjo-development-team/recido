import { View, Text, Platform, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { setInvoice } from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceId, setDate } from '../../../../../features/useFormSlice'
import app from '../../../../../style/app'
import color from '../../../../../style/color';

const SetInvoice = () => {
    const { navigate, goBack } = useNavigation()
    const dispatch = useDispatch()

    const { invoiceId, date } = useSelector(state => state.form)
    const { theme } = useSelector(state => state.user)

    const [show, setShow] = useState(false)
    const [id, setId] = useState(invoiceId)

    const onChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            dispatch(setDate(selectedDate))
        }
        setShow(false);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'ios') {
            setShow(true);
        } else {
            setShow(true);
        }
    }

    const updateid = () => {
        dispatch(setInvoiceId(id))
        goBack()
    }

    return (
        <View style={{ ...setInvoice.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={app.head}>
                <Text style={{ ...app.title2, color: theme ? color.white : color.dark }}>Details</Text>
                <TouchableOpacity onPress={updateid} style={app.doneButton}>
                    <Text style={setInvoice.headText}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={setInvoice.group}>
                    <View style={setInvoice.list}>
                        <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Invoice Number</Text>
                        <TextInput style={{ ...app.input, color: theme ? color.white : color.dark }} placeholder='Invoice number' value={id} onChangeText={text => setId(text)} />
                    </View>
                    <View style={setInvoice.list}>
                        <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Date</Text>
                        {
                            !show ?
                                <TouchableOpacity style={{ ...app.input, justifyContent: 'center' }} onPress={() => showMode('date')}>
                                    <Text style={{ color: theme ? color.white : color.dark }}>{`${new Date(date).toLocaleDateString()}`}</Text>
                                </TouchableOpacity> :
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={new Date(date)}
                                        mode='date'
                                        display='inline'
                                        is24Hour={true}
                                        onChange={onChange}
                                        themeVariant={theme ? 'dark' : 'light'}
                                    />
                                    <TouchableOpacity onPress={() => setShow(false)} style={{ ...setInvoice.confirmButton, backgroundColor: theme ? `${color.black}20` : color.white }}>
                                        <Text style={{ ...setInvoice.confirmButtonText, color: theme ? color.white : color.dark }}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SetInvoice