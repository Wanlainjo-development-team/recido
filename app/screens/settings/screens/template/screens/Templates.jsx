import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Text } from 'react-native';
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
    const { profile, theme } = useSelector(state => state.user)

    const updateChosenTemplate = async item => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        await updateDoc(doc(db, 'users', id), { selectedTemplatePreview: item })
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={styles.previewGrid}>
                    {
                        templatesPreview?.map((item, index) => (
                            <View>
                                <TouchableOpacity key={index} onPress={() => updateChosenTemplate(item)} style={{ ...styles.imageButton, borderColor: item.invoice == profile?.selectedTemplatePreview?.invoice ? color.accent : color.transparent }}>
                                    <AutoHeightImage
                                        width={(width / 2) - 15}
                                        style={{ borderRadius: 12 }}
                                        source={{ uri: item?.preview }}
                                    />
                                </TouchableOpacity>
                                {index == 0 && <Text style={{ ...styles.imageLabel, marginBottom: 10, color: item.invoice == profile?.selectedTemplatePreview?.invoice ? color.accent : (theme ? color.white : color.dark), fontWeight: '600' }}>Classic</Text>}
                                {index == 1 && <Text style={{ ...styles.imageLabel, marginBottom: 10, color: item.invoice == profile?.selectedTemplatePreview?.invoice ? color.accent : (theme ? color.white : color.dark), fontWeight: '600' }}>Compact</Text>}
                                {index == 2 && <Text style={{ ...styles.imageLabel, marginBottom: 10, color: item.invoice == profile?.selectedTemplatePreview?.invoice ? color.accent : (theme ? color.white : color.dark), fontWeight: '600' }}>Clean</Text>}
                                {index == 3 && <Text style={{ ...styles.imageLabel, marginBottom: 10, color: item.invoice == profile?.selectedTemplatePreview?.invoice ? color.accent : (theme ? color.white : color.dark), fontWeight: '600' }}>Sharp</Text>}
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Template