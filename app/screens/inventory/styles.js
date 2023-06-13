import { StyleSheet } from "react-native";
import color from '../../style/color'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },

    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.accent,
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
})