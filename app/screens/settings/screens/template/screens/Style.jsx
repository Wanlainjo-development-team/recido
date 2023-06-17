import { View, Text } from 'react-native'
import React from 'react'
import style from './style'
import { ScrollView } from 'react-native'
import templatesPreview from '../../../../../components/fragments/templatesPreview'
import { useSelector } from 'react-redux'
import AutoHeightImage from 'react-native-auto-height-image'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'

const { width } = Dimensions.get('window')

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

const Style = () => {
  const { profile } = useSelector(state => state.user)

  const findTemplate = () => {
    const foundObject = templatesPreview.find(obj => obj.invoice === profile?.selectedTemplatePreview?.invoice)

    return foundObject
  }

  const colors = [];

  for (let i = 0; i < 24; i++) {
    const randomColor = getRandomColor();
    colors.push(randomColor);
  }


  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AutoHeightImage
          width={width - 10}
          source={{ uri: findTemplate().preview }}
        />
      </ScrollView>
      <View style={style.buttonGrid}>
        {
          colors.map((item, index) => <TouchableOpacity key={index} style={{ ...style.button, backgroundColor: item }} />)
        }
      </View>
    </View>
  )
}

export default Style