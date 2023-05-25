import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { noteStyle } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNote } from '../../../../../features/useFormSlice'

const Note = () => {
    const { goBack } = useNavigation()
    const { profile } = useSelector(state => state.user)
    const { note } = useSelector(state => state.form)
    const { editNote } = useRoute().params
    const dispatch = useDispatch()

    const [newNote, setNewNote] = useState('')
    const [inputHeight, setInputHeight] = useState(100);

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


    return (
        <View style={noteStyle.container}>
            <View style={noteStyle.head}>
                <TouchableOpacity onPress={goBack}>
                    <Text style={noteStyle.headText}>Cancel</Text>
                </TouchableOpacity>
                <Text>📝 Note</Text>
                <TouchableOpacity onPress={updateNote}>
                    <Text style={noteStyle.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={noteStyle.scrollView} showsVerticalScrollIndicator={false}>
                <TextInput
                    value={newNote}
                    multiline={true}
                    placeholder='Note'
                    onChangeText={setNewNote}
                    onContentSizeChange={handleContentSizeChange}
                    style={{ ...noteStyle.input, minHeight: inputHeight, maxHeight: 150 }}
                />
            </ScrollView>
        </View>
    )
}

export default Note