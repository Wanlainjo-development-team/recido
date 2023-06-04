import { View, Text, ScrollView, TouchableOpacity, TextInput, Animated, Easing } from 'react-native'
import React from 'react'

import styles from './styles'

import Invoices from '../../components/invoices'

import { Feather, Ionicons } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

const Invoice = () => {
  const { navigate } = useNavigation()

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

  useLayoutEffect(() => {
    startRotationAnimation()
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TextInput placeholder='Search...' style={styles.input} placeholderTextColor={color.mainBackground} />

        <TouchableOpacity style={styles.searchConfigButton}>
          <Animated.View style={{ transform: [{ rotate: rotationValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
            <Ionicons name="cog" size={24} color={color.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <Invoices numOfClice={false} />
      </ScrollView>

      <TouchableOpacity onPress={() => navigate('Create', { viewInvoice: null })} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default Invoice