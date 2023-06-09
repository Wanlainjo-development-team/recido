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

    title: {
        fontSize: 25,
        fontWeight: '900',
        opacity: .40
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