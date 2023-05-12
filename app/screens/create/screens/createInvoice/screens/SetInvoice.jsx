import { View, Text, Button, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { setInvoice } from './styles'
import { TextInput } from 'react-native'
import color from '../../../../../style/color'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'

const SetInvoice = () => {
    const { navigate } = useNavigation()
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }

    const showMode = (currentMode) => {
        if (Platform.OS === 'ios') setShow(true)
        setMode(currentMode);
    }

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={setInvoice.container}>
            <View style={setInvoice.group}>
                <View style={setInvoice.list}>
                    <Text>Invoice Number:</Text>
                    <TextInput placeholder='Invoice number' />
                </View>
                <View style={setInvoice.list}>
                    <Text>Date:</Text>
                    {
                        !show ?
                            <TouchableOpacity onPress={showDatepicker}>
                                <Text>{`${new Date(date).toLocaleDateString()}`}</Text>
                            </TouchableOpacity> :
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                display='spinner'
                                is24Hour={true}
                                onChange={onChange}
                            />
                    }
                </View>
                <TouchableOpacity onPress={() => navigate('Terms')} style={setInvoice.list}>
                    <Text>Terms:</Text>
                    <TextInput placeholder='Invoice number' editable={false} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SetInvoice