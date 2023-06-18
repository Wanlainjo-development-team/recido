import { StyleSheet } from "react-native";
import color from "../../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },

    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },

    button: {
        width: 45,
        height: 45,
        marginTop: 5,
        borderWidth: 4,
        borderColor: color.transparent,
        borderRadius: 12
    }
})