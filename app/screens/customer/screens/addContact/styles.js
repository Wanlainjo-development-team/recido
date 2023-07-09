import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10,
    },

    group: {
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    groupText: {
        color: color.accent,
        marginLeft: 10
    }
})