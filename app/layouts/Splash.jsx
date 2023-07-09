import { View, Image } from 'react-native'
import React from 'react'
import color from '../style/color'

import image from '../../assets/icon.png'
import { useSelector } from 'react-redux'

const Splash = () => {
  const { theme } = useSelector(state => state.user)

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme ? color.dark : color.mainBackground
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