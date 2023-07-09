import { View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import styles from './styles'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const { Navigator, Screen } = createMaterialTopTabNavigator()

import Invoices from './screens/Invoices'
import Inventory from './screens/Inventory'
import Contacts from './screens/Contacts'
import color from '../../style/color'
import { useSelector } from 'react-redux'

const Archive = () => {
    const { theme } = useSelector(state => state.user)

    return (
        <View style={{ ...styles.container, paddingHorizontal: 0, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <Header title='Archive' />

            <Navigator
                tabBarPosition='bottom'
                screenOptions={{
                    swipeEnabled: false,
                    tabBarStyle: {
                        backgroundColor: theme ? color.dark : color.mainBackground,
                    },
                    tabBarLabelStyle: {
                        color: theme ? color.white : color.dark
                    }
                }}
            >
                <Screen name="Invoices" component={Invoices} />
                <Screen name="Inventory" component={Inventory} />
                <Screen name="Contacts" component={Contacts} options={{ title: 'Customers' }} />
            </Navigator>

        </View>
    )
}

export default Archive