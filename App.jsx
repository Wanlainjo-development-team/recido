import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'

import StackNavigation from './app/layouts/StackNavigator'

import { Provider } from 'react-redux'
import { store } from './app/store'

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </Provider>
    )
}