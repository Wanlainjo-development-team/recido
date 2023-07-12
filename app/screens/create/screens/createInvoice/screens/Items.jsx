import { View, Text, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

import { itemsStyle } from './styles'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import color from '../../../../../style/color'
import { useDispatch, useSelector } from 'react-redux'
import InventoryList from '../../../../../components/inventory'
import app from '../../../../../style/app'
import { setItems } from '../../../../../features/useFormSlice'

const Items = () => {
    const { goBack, navigate } = useNavigation()
    const dispatch = useDispatch()

    const { items } = useSelector(state => state.form)
    const { theme, profile } = useSelector(state => state.user)
    const { inventoryList } = useSelector(state => state.inventory)

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(inventoryList);

    const calculateDiscount = prop => {
        let price = prop?.price * prop?.quantity

        return (price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const filterItems = (query) => {
        const filtered = inventoryList.filter((item) =>
            item?.name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const addItem = item => {
        if (item.quantity >= 1)
            dispatch(setItems({
                ...item,
                name: item.name,
                price: item.price,
                quantity: JSON.stringify(1),
                description: item.description
            }))
        else
            Alert.alert('Seems this item is sold out 😕😕')
    }

    return (
        <View style={{ ...itemsStyle.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={app.head}>
                <Text style={{ ...app.title1, color: theme ? color.white : color.dark }}>📦 Add items</Text>
                <TouchableOpacity onPress={goBack} style={app.doneButton}>
                    <Text style={app.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigate('CreateItem', { editItem: null })} style={itemsStyle.createNew}>
                <AntDesign name="pluscircleo" size={22} color={color.accent} />
                <Text style={itemsStyle.createNewText}>Create new item</Text>
            </TouchableOpacity>

            {
                items.length >= 1 &&
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index}
                    style={itemsStyle.flatList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={itemsStyle.group} onPress={() => navigate('CreateItem', { editItem: { ...item, index } })}>
                            <View style={itemsStyle.groupLeft}>
                                <Text style={{ ...itemsStyle.groupBoldText, color: theme ? color.white : color.dark }} numberOfLines={1}>{item?.name}</Text>
                                <Text style={{ ...itemsStyle.groupOpacityText, color: theme ? color.white : color.dark }} numberOfLines={1}>{(item?.description)?.slice(0, 20)}</Text>
                            </View>
                            <View style={itemsStyle.groupRight}>
                                <Text style={{ ...itemsStyle.groupOpacityText, color: theme ? color.white : color.dark }}>{(item?.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x {(item?.price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                                <Text style={{ ...itemsStyle.groupBoldText, color: theme ? color.white : color.dark }} numberOfLines={1}>{calculateDiscount(item)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            }

            <Text style={{ ...app.title2, color: theme ? color.white : color.dark, marginTop: 20 }}>Inventory</Text>
            <TextInput
                style={{ ...app.input, marginTop: 20 }}
                placeholder='Search inventory...'
                placeholderTextColor={theme ? color.white : color.dark}
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    filterItems(text);
                }}
            />

            <FlatList
                data={filteredItems}
                keyExtractor={(item, index) => index}
                style={{ marginTop: 10 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => addItem(item)} style={{ ...itemsStyle.list, paddingTop: 10, backgroundColor: theme ? color.black : color.white }}>
                        <View style={itemsStyle.left}>
                            <Text style={{ ...itemsStyle.boldText, color: theme ? color.white : color.dark }}>{item?.name}</Text>
                            <Text style={{ color: theme ? color.white : color.dark }}>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Left</Text>
                        </View>
                        <View style={itemsStyle.right}>
                            <Text style={{ color: theme ? color.white : color.dark }}>{profile?.denom?.sign || '$'}{item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Items