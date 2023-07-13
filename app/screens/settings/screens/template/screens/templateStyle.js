import { StyleSheet } from "react-native";
import color from "../../../../../style/color";

export default StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },

    previewGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    imageButton: {
        borderWidth: 2,
        borderColor: color.transparent,
        borderRadius: 14,
        overflow: 'hidden'
    },

    imageLabel: {
        textAlign: 'center',
        marginTop: 2
    }
})