import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { noteStyle } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setNote } from '../../../../../features/useFormSlice'
import color from '../../../../../style/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../../hooks/firebase'
import app from '../../../../../style/app'

const Note = () => {
    const { goBack } = useNavigation()
    const { profile, theme } = useSelector(state => state.user)
    const { note } = useSelector(state => state.form)
    const { editNote } = useRoute().params
    const dispatch = useDispatch()

    const [newNote, setNewNote] = useState('')
    const [inputHeight, setInputHeight] = useState(200);
    const [loading, setLoading] = useState(false)

    const handleContentSizeChange = (event) => {
        setInputHeight(event.nativeEvent.contentSize.height);
    };

    useLayoutEffect(() => {
        (() => {
            if (editNote == '' || editNote == undefined)
                setNewNote(note != '' ? note : profile?.disclaimer)
            else
                setNewNote(editNote)
        })()
    }, [])

    const updateNote = () => {
        dispatch(setNote(newNote))
        goBack()
    }

    const updateUserDisclaimer = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        setLoading(true)

        await updateDoc(doc(db, 'users', id), {
            disclaimer: newNote
        })

        Alert.alert('Note successfully updated 🎉🎉')

        setLoading(false)
    }


    return (
        <View style={{ ...noteStyle.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={app.head}>
                <TouchableOpacity onPress={goBack} style={app.backButton}>
                    <Text style={app.backButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ ...app.title1, color: theme ? color.white : color.dark }}>📝 Note</Text>
                <TouchableOpacity onPress={updateNote} style={app.doneButton}>
                    <Text style={app.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Note</Text>
                <TextInput
                    value={newNote}
                    multiline={true}
                    placeholder='Note'
                    placeholderTextColor={theme ? color.white : color.dark}
                    onChangeText={setNewNote}
                    onContentSizeChange={handleContentSizeChange}
                    style={{ ...app.input, minHeight: inputHeight, maxHeight: 200, height: null, color: theme ? color.white : color.dark }}
                />
            </ScrollView>
            <TouchableOpacity onPress={updateUserDisclaimer} style={noteStyle.saveButton}>
                {
                    loading ?
                        <ActivityIndicator color={color.white} size='small' /> :
                        <Text style={noteStyle.saveButtonText}>Save as new</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Note