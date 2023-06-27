import { View, Text, Button, Platform, TouchableOpacity, Switch, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { setInvoice } from './styles'
import { TextInput } from 'react-native'
import color from '../../../../../style/color'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceId, setDate } from '../../../../../features/useFormSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import app from '../../../../../style/app'

const SetInvoice = () => {
    const { navigate, goBack } = useNavigation()
    const dispatch = useDispatch()

    const { invoiceId, date } = useSelector(state => state.form)

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => dispatch(setDate(selectedDate))

    const showMode = (currentMode) => {
        if (Platform.OS === 'ios') setShow(true)
        setMode(currentMode);
    }

    const showDatepicker = () => showMode('date')

    return (
        <View style={setInvoice.container}>
            <View style={setInvoice.head}>
                <Text style={app.title1}>Details</Text>
                <TouchableOpacity onPress={goBack} style={{ padding: 10 }}>
                    <Text style={setInvoice.headText}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={setInvoice.group}>
                    <View style={setInvoice.list}>
                        <Text>Invoice Number</Text>
                        <TextInput placeholder='Invoice number' value={invoiceId} onChangeText={text => dispatch(setInvoiceId(text))} />
                    </View>
                    <View style={setInvoice.list}>
                        <Text>Date</Text>
                        {
                            !show ?
                                <TouchableOpacity onPress={showDatepicker}>
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