import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'

import { itemsStyle } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import color from '../../../../../style/color'
import { useSelector } from 'react-redux'

const Items = () => {
    const { goBack, navigate } = useNavigation()

    const { items } = useSelector(state => state.form)

    const calculateDiscount = prop => {
        let price = prop?.price * prop?.quantity
        let percentage = prop?.discounts

        let result = price - (price * percentage / 100)

        return (result).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
        <View style={itemsStyle.container}>
            <View style={itemsStyle.head}>
                <View />
                <Text>📦 Add items</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={itemsStyle.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigate('CreateItem', { editItem: null })} style={itemsStyle.createNew}>
                <AntDesign name="pluscircleo" size={22} color={color.accent} />
                <Text style={itemsStyle.createNewText}>Create new item</Text>
            </TouchableOpacity>

            <FlatList
                data={items}
                keyExtractor={(item, index) => index}
                style={itemsStyle.flatList}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={itemsStyle.group} onPress={() => navigate('CreateItem', { editItem: { ...item, index } })}>
                        <View style={itemsStyle.groupLeft}>
                            <Text numberOfLines={1}>{item?.name}</Text>
                            {
                                item?.discription &&
                                <Text style={itemsStyle.groupOpacityText} numberOfLines={1}>{(item?.discription)?.slice(0, 20)}</Text>
                            }
                        </View>
                        <View style={itemsStyle.groupRight}>
                            <Text style={itemsStyle.groupOpacityText}>{(item?.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x {(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                            <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{calculateDiscount(item)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Items