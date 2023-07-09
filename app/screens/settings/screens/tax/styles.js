import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    conttainer: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },

    typeButton: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginTop: 10
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