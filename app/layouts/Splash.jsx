import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import color from '../style/color'
import { Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../hooks/firebase'
import { logout, setUser } from '../features/userSlice'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

const Splash = () => {
  const dispatch = useDispatch()
  const focused = useIsFocused()

  useLayoutEffect(() => {
    onAuthStateChanged(auth, userAuth => {
      if (userAuth)
        dispatch(setUser(userAuth))
      else
        dispatch(logout())
    })
  }, [])

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.mainBackground
    }}>
      <Image
        style={{
          width: 80,
          height: 90
        }}
        source={{ uri: 'https://res.cloudinary.com/rukkiecodes/image/upload/v1679063972/Screenshot_2023-03-12_004935_tzmctw.png' }}
      />
    </View>
  )
}

export default Splash