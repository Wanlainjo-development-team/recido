import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },
    profileImageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileImage: {
        overflow: 'hidden',
        borderRadius: 100,
        width: 150,
        height: 150
    },

    inputText: {
    },

    inputView: {
        marginBottom: 30
    },

    input: {
        height: 45,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    }
})