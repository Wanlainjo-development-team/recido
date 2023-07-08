import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import templatesPreview from '../../../../../components/fragments/templatesPreview';
import styles from './templateStyle';
import AutoHeightImage from 'react-native-auto-height-image';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../hooks/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../../../../style/color';


const { width } = Dimensions.get('window')

const Template = () => {
    const { profile } = useSelector(state => state.user)

    const updateChosenTemplate = async item => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        await updateDoc(doc(db, 'users', id), { selectedTemplatePreview: item })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={styles.previewGrid}>
                    {
                        templatesPreview?.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => updateChosenTemplate(item)} style={{ ...styles.imageButton, borderColor: item.invoice == profile?.selectedTemplatePreview?.invoice ? color.accent : color.transparent }}>
                                <AutoHeightImage
                                    width={(width / 2) - 15}
                                    source={{ uri: item?.preview }}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Template