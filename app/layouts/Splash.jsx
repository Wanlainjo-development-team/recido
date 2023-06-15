import { View } from 'react-native'
import React from 'react'
import color from '../style/color'
import { Image } from 'react-native'

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
          width: 40,
          height: 45
        }}
        source={{ uri: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1679063972/Screenshot_2023-03-12_004935_tzmctw.png' }}
      />
    </View>
  )
}

export default Splash