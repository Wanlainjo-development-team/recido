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
            <View style={style.sheetContainer}>
                <BlurView intensity={50} tint='light' style={style.sheet}>
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
                                        {index == 0 && <Text style={style.imageLabel}>Classic</Text>}
                                        {index == 1 && <Text style={style.imageLabel}>Compact</Text>}
                                        {index == 2 && <Text style={style.imageLabel}>Clean</Text>}
                                        {index == 3 && <Text style={style.imageLabel}>Sharp</Text>}
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </ScrollView>
                </BlurView>
            </View>
        </LinearGradient>
    )
}

export default SelectTemplate