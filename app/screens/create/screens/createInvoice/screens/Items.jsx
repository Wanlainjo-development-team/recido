import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

import { itemsStyle } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import color from '../../../../../style/color'
import { useSelector } from 'react-redux'
import InventoryList from '../../../../../components/inventory'
import app from '../../../../../style/app'

const Items = () => {
    const { goBack, navigate } = useNavigation()

    const { items } = useSelector(state => state.form)

    const calculateDiscount = prop => {
        let price = prop?.price * prop?.quantity

        return (price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
        <View style={itemsStyle.container}>
            <View style={app.head}>
                <Text style={app.title1}>📦 Add items</Text>
                <TouchableOpacity onPress={goBack} style={app.doneButton}>
                    <Text style={app.doneButtonText}>Done</Text>
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
                            <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{item?.name}</Text>
                            <Text style={itemsStyle.groupOpacityText} numberOfLines={1}>{(item?.description)?.slice(0, 20)}</Text>
                        </View>
                        <View style={itemsStyle.groupRight}>
                            <Text style={itemsStyle.groupOpacityText}>{(item?.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x {(item?.price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                            <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{calculateDiscount(item)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Text style={app.title2}>Inventory</Text>
            <InventoryList selectItem={true} />
        </View>
    )
}

export default Items