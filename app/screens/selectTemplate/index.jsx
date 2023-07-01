import { View, Text } from 'react-native'
import React from 'react'
import style, { imageWidth } from './style'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import { AntDesign } from '@expo/vector-icons';
import color from '../../style/color'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTemplatePreview } from '../../features/useFormSlice'

import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../hooks/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

const SelectTemplate = () => {
    const { goBack } = useNavigation()
    const { templatesPreview } = useRoute().params
    const dispatch = useDispatch()

    const { selectedTemplatePreview } = useSelector(state => state.form)

    const selectTemplate = async prop => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        await updateDoc(doc(db, 'users', id), {
            selectedTemplatePreview: prop
        })

        dispatch(setSelectedTemplatePreview(prop))

        goBack()
    }

    return (
        <LinearGradient colors={[color.transparent, `${color.mainBackground}80`]} style={style.container}>
            <TouchableOpacity onPress={goBack} style={style.blank} />
            <BlurView intensity={50} style={style.sheet}>
                <View style={style.head}>
                    <Text style={style.headText}>Pick template</Text>

                    <TouchableOpacity onPress={goBack} style={style.backButton}>
                        <AntDesign name="back" size={24} color={color.accent} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={templatesPreview}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => selectTemplate(item)} style={style.imageButton}>
                            <AutoHeightImage
                                width={imageWidth}
                                style={style.image}
                                source={{ uri: item?.preview }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </BlurView>
        </LinearGradient>
    )
}

export default SelectTemplate