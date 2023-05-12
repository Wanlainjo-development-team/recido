import { View, Text } from 'react-native'
import React from 'react'
import { terms } from './styles'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Terms = () => {
    const { goBack } = useNavigation()
    const data = [
        'None',
        'Custom',
        'Due on receipt',
        'Next Day',
        '2 Days',
        '3 Days',
        '4 Days',
        '5 Days',
        '6 Days',
        '7 Days',
        '10 Days',
        '14 Days',
        '21 Days',
        '30 Days',
        '45 Days',
        '60 Days',
        '90 Days',
        '120 Days',
        '180 Days',
        '365 Days',
    ]
    return (
        <View style={terms.container}>
            <TouchableOpacity onPress={goBack} style={{ flex: 1 }} />
            <View>
                <FlatList
                    data={data}
                    style={terms.flatList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ ...terms.listButton, borderBottomWidth: (index + 1) == data.length ? 0 : 1 }}>
                            <Text style={terms.listButtonText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity onPress={goBack} style={terms.cancelButton}>
                <Text style={terms.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Terms