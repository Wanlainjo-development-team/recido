import { View, TextInput, TouchableOpacity, Animated, Easing } from 'react-native'
import React from 'react'
import Invoices from '../../../../components/invoices'
import styles from '../../styles'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../../../style/color';
import { useNavigation } from '@react-navigation/native';
import style from './style';
import { setSearch } from '../../../../features/invoicesSlice';

const Search = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const { profile, theme } = useSelector(state => state.user)
  const { search } = useSelector(state => state.invoices)

  const rotationValue = new Animated.Value(0)

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  startRotationAnimation()

  const handleSearch = (query) => {
    dispatch(setSearch(query))
  };

  return (
    <View style={{ ...style.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <View style={styles.head}>
        <TextInput placeholder={`Search ${profile?.searchBy == 'invoiceContact.name' ? 'Customer name' : 'Invoice number'}...`} placeholderTextColor={theme ? color.mainBackground : color.dark} style={styles.input} value={search} onChangeText={handleSearch} />

        <TouchableOpacity onPress={() => navigate('InvoiceSearchConfig')} style={styles.searchConfigButton}>
          <Animated.View style={{ transform: [{ rotate: rotationValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
            <Ionicons name="cog" size={24} color={color.accent} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Invoices numOfClice={false} fetchScale='all' showLabel={true} currentTab='search' />
    </View>
  )
}

export default Search