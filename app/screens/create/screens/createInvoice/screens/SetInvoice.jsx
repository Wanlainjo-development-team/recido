import { View, Text, Platform, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { setInvoice } from './styles'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceId, setDate } from '../../../../../features/useFormSlice'
import app from '../../../../../style/app'

const SetInvoice = () => {
    const { navigate, goBack } = useNavigation()
    const dispatch = useDispatch()

    const { invoiceId, date } = useSelector(state => state.form)

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false)
    const [id, setId] = useState(invoiceId)

    const onChange = (event, selectedDate) => dispatch(setDate(selectedDate))

    const showMode = (currentMode) => {
        if (Platform.OS === 'ios') setShow(true)
        setMode(currentMode);
    }

    const showDatepicker = () => showMode('date')

    const updateid = () => {
        dispatch(setInvoiceId(id))
        goBack()
    }

    return (
        <View style={setInvoice.container}>
            <View style={app.head}>
                <Text style={app.title2}>Details</Text>
                <TouchableOpacity onPress={updateid} style={app.doneButton}>
                    <Text style={setInvoice.headText}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={setInvoice.group}>
                    <View style={setInvoice.list}>
                        <Text style={app.inputText}>Invoice Number</Text>
                        <TextInput style={app.input} placeholder='Invoice number' value={id} onChangeText={text => setId(text)} />
                    </View>
                    <View style={setInvoice.list}>
                        <Text style={app.inputText}>Date</Text>
                        {
                            !show ?
                                <TouchableOpacity style={{ ...app.input, justifyContent: 'center' }} onPress={showDatepicker}>
                                    <Text>{`${new Date(date).toLocaleDateString()}`}</Text>
                                </TouchableOpacity> :
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={new Date(date)}
                                        mode={mode}
                                        display='spinner'
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                    <TouchableOpacity onPress={() => setShow(false)} style={setInvoice.confirmButton}>
                                        <Text style={setInvoice.confirmButtonText}>Confirm</Text>
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