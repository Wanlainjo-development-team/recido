import { View, Text, Button, Platform, TouchableOpacity, Switch, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { setInvoice } from './styles'
import { TextInput } from 'react-native'
import color from '../../../../../style/color'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setOrder, setDate, setDueDate, setRemoveDueDate } from '../../../../../features/useFormSlice'

const SetInvoice = () => {
    const { navigate, goBack } = useNavigation()
    const dispatch = useDispatch()

    const { order, date, dueDate, removeDueDate } = useSelector(state => state.form)

    const [mode, setMode] = useState('date');
    const [dueDateMode, setDueDateMode] = useState('date');
    const [show, setShow] = useState(false)
    const [dueDateShow, setDueDateShow] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)

    const onChange = (event, selectedDate) => dispatch(setDate(selectedDate))

    const onDueDateChange = (event, selectedDate) => {
        dispatch(setDueDate(selectedDate))
    }

    const showMode = (currentMode) => {
        if (Platform.OS === 'ios') setShow(true)
        setMode(currentMode);
    }

    const showDueDateMode = (currentMode) => {
        if (Platform.OS === 'ios') setDueDateShow(true)
        setDueDateMode(currentMode);
    }

    const showDatepicker = () => showMode('date')

    const showDewDatepicker = () => showDueDateMode('date')

    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    useEffect(() => {
        dispatch(setRemoveDueDate(!isEnabled))
    }, [isEnabled])

    return (
        <View style={setInvoice.container}>
            <View style={setInvoice.head}>
                <TouchableOpacity onPress={goBack}>
                    <Text style={setInvoice.headText}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={setInvoice.group}>
                    <View style={setInvoice.list}>
                        <Text>Invoice Number</Text>
                        <TextInput placeholder='Invoice number' value={order} onChangeText={text => dispatch(setOrder(text))} />
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
                    {
                        removeDueDate &&
                        <View style={setInvoice.list}>
                            <Text>Due date</Text>
                            {
                                !dueDateShow ?
                                    <TouchableOpacity onPress={showDewDatepicker}>
                                        <Text>{`${new Date(dueDate).toLocaleDateString()}`}</Text>
                                    </TouchableOpacity> :
                                    <View>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={new Date(dueDate)}
                                            mode={dueDateMode}
                                            display='spinner'
                                            is24Hour={true}
                                            onChange={onDueDateChange}
                                        />
                                        <TouchableOpacity onPress={() => setDueDateShow(false)} style={setInvoice.confirmButton}>
                                            <Text style={setInvoice.confirmButtonText}>Confirm</Text>
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>
                    }
                    <View style={setInvoice.list}>
                        <Text>Remove due date</Text>

                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? color.accent : color.mainBackground}
                            ios_backgroundColor={`${color.accent}40`}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SetInvoice