import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AutoHeightImage from 'react-native-auto-height-image';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTemplatePreview } from '../../features/useFormSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import style, { imageWidth } from './style';
import color from '../../style/color';

const SelectTemplate = () => {
    const { goBack } = useNavigation()
    const { templatesPreview } = useRoute().params
    const dispatch = useDispatch()

    const selectTemplate = async prop => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid
        goBack()

        await updateDoc(doc(db, 'users', id), {
            selectedTemplatePreview: prop
        })

        dispatch(setSelectedTemplatePreview(prop))
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

                <ScrollView>
                    <View style={style.imageButtonView}>
                        {
                            templatesPreview?.map((item, index) =>
                                <TouchableOpacity key={index} onPress={() => selectTemplate(item)} style={style.imageButton}>
                                    <AutoHeightImage
                                        width={imageWidth}
                                        style={style.image}
                                        source={{ uri: item?.preview }}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </ScrollView>
            </BlurView>
        </LinearGradient>
    )
}

export default SelectTemplate