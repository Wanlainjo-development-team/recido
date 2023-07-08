import { View, Image } from 'react-native'
import React from 'react'
import color from '../style/color'

import image from '../../assets/icon.png'

const Splash = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.white
    }}>
      <Image
        style={{
          width: 70,
          height: 70
        }}
        source={image}
      />
    </View>
  )
}

export default Splash