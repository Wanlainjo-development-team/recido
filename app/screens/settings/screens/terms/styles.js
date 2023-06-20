import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    conttainer: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },

    textView: {
        marginBottom: 30
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
        opacity: .40,
        marginBottom: 10
    },

    texts: {
        marginBottom: 10
    }
})