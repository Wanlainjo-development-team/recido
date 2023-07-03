import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native'
import React, { useEffect } from 'react'

import styles from './styles'

import { Feather } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setInvoiceList } from '../../features/invoicesSlice';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../hooks/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import All from './screens/all';
import Outstanding from './screens/outstanding';
import Paid from './screens/paid';
import Search from './screens/search';

const { Navigator, Screen } = createMaterialTopTabNavigator()

const Invoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

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
      const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid;

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


  return (
    <View style={styles.container}>
      <Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarActiveTintColor: color.accent,
          tabBarInactiveTintColor: `${color.black}80`,
          tabBarStyle: {
            backgroundColor: color.mainBackground,
            height: 40
          },
          tabBarLabelStyle: {
            fontWeight: 600,
          }
        }}
      >
        <Screen
          name="All"
          component={All}
          options={{
            title: ({ color }) => <Text style={{ fontSize: 12, fontWeight: '600', color }}>All</Text>
          }}
        />
        <Screen
          name="Outstanding"
          component={Outstanding}
          options={{
            title: ({ color }) => <Text style={{ fontSize: 12, fontWeight: '600', color }}>Outstanding</Text>
          }}
        />
        <Screen
          name="Paid"
          component={Paid}
          options={{
            title: ({ color }) => <Text style={{ fontSize: 12, fontWeight: '600', color }}>Paid</Text>
          }}
        />
        <Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
            tabBarLabelStyle: {
              fontWeight: '600',
              color: color.accent,
            },
          }}
        />
      </Navigator>

      <TouchableOpacity onPress={() => navigate('Create', { viewInvoice: null })} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default Invoice