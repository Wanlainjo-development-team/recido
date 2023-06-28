import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const { Navigator, Screen } = createMaterialTopTabNavigator()

import Invoices from './screens/Invoices'
import Inventory from './screens/Inventory'
import Contacts from './screens/Contacts'
import color from '../../style/color'

const Archive = () => {
    return (
        <View style={{ ...styles.container, paddingHorizontal: 0 }}>
            <Header title='Archive' />

            <Navigator
                tabBarPosition='bottom'
                screenOptions={{
                    swipeEnabled: false,
                    tabBarStyle: {
                        backgroundColor: color.mainBackground
                    }
                }}
            >
                <Screen name="Invoices" component={Invoices} />
                <Screen name="Inventory" component={Inventory} />
                <Screen name="Contacts" component={Contacts} />
            </Navigator>

        </View>
    )
}

export default Archive