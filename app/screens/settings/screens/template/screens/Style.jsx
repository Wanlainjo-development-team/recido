import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import style from './style'
import { ScrollView } from 'react-native'
import templatesPreview from '../../../../../components/fragments/templatesPreview'
import { useSelector } from 'react-redux'
import AutoHeightImage from 'react-native-auto-height-image'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../hooks/firebase'
import color from '../../../../../style/color'
import { WebView } from 'react-native-webview'

import { IV1 } from '../../../../create/screens/preview/templates/IV1';
import { IV2 } from '../../../../create/screens/preview/templates/IV2';
import { IV3 } from '../../../../create/screens/preview/templates/IV3';
import { IV4 } from '../../../../create/screens/preview/templates/IV4';
import { useLayoutEffect } from 'react'
import { useRef } from 'react'

const Style = () => {
  const { profile } = useSelector(state => state.user)
  const webViewRef = useRef(null)

  const [colors, setColors] = useState([
    '333333',
    '555555',
    '465A65',
    '5D4038',
    'C62827',
    'D61B60',
    '7A1FA2',
    '45289F',
    '283593',
    '1564C0',
    '0277BD',
    '00695B',
    '2F7D32',
    '548B2E'
  ])
  const [invoiceData, setInvoiceData] = useState(null)

  let html = ``

  const findTemplate = () => {
    const foundObject = templatesPreview.find(obj => obj.invoice === profile?.selectedTemplatePreview?.invoice)

    return foundObject
  }

  const setInvoiceColor = async item => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    await updateDoc(doc(db, 'users', id), { invoiceColor: item })
  }


  useEffect(() => {
    (async () => {

      const snapshot = await getDocs(collection(db, 'demoInvoice'))

      setInvoiceData({ ...snapshot.docs[0].data(), invoiceId: '0003334' })
    })()
  }, [])

  switch (profile?.selectedTemplatePreview?.id) {
    case 1: html = IV1(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
      break
    case 2: html = IV2(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
      break
    case 3: html = IV3(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
      break
    case 4: html = IV4(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
      break
    default: IV1(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
  }


  return (
    <View style={style.container}>
      <WebView source={{ html: html }} ref={webViewRef} scalesPageToFit={true} style={{ flex: 1 }} />
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <AutoHeightImage
          width={width - 10}
          source={{ uri: findTemplate().preview }}
        />
      </ScrollView> */}
      <View style={style.buttonGrid}>
        {
          colors.map((item, index) =>
            <TouchableOpacity
              key={index}
              onPress={() => setInvoiceColor(item)}
              style={{ ...style.button, backgroundColor: `#${item}`, borderColor: item == profile?.invoiceColor ? color.accent : color.transparent }} />
          )
        }
      </View>
    </View>
  )
}

export default Style