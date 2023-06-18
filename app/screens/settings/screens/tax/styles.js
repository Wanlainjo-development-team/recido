import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    conttainer: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },

    typeButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginTop: 10
    },

    inputViewText: {

    },

    input: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    saveButton: {
        backgroundColor: `${color.accent}40`,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    saveButtonText: {
        color: color.accent,
        fontWeight: '600'
    }
})