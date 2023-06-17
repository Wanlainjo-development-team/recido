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
        fontSize: 12
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        opacity: .40
    },

    inputView: {
        marginBottom: 30
    },

    input: {
        height: 45,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    saveButton: {
        backgroundColor: `${color.accent}40`,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 10
    },

    saveButtonText: {
        color: color.accent,
        fontWeight: '600'
    }
})