import { View, ScrollView, TouchableOpacity, TextInput, Animated, Easing } from 'react-native'
import React, { useEffect } from 'react'

import styles from './styles'

import Invoices from '../../components/invoices'

import { Feather, Ionicons } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceList, setSearch } from '../../features/invoicesSlice';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../hooks/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Invoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

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


  useEffect(() => {
    const fetchData = async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid;

      const q = query(
        collection(db, 'users', id, 'invoices'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let invoices = [];
        querySnapshot.forEach((doc) => {
          invoices.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        dispatch(setInvoiceList(invoices));
      });

      return unsubscribe;
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    dispatch(setSearch(query))
  };


  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TextInput placeholder='Search...' style={styles.input} value={search} onChangeText={handleSearch} placeholderTextColor={color.mainBackground} />

        <TouchableOpacity style={styles.searchConfigButton}>
          <Animated.View style={{ transform: [{ rotate: rotationValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
            <Ionicons name="cog" size={24} color={color.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Invoices numOfClice={false} />
      </ScrollView>

      <TouchableOpacity onPress={() => navigate('Create', { viewInvoice: null })} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default Invoice