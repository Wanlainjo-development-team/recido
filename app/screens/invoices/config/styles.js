import { StyleSheet, StatusBar, Dimensions } from "react-native";
import color from "../../../style/color";

const { width, height } = Dimensions.get('window')

export const imageWidth = width - 40;

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    blank: {
        flex: 1,
        opacity: 0,
    },
    sheet: {
        height: (2 * height) / 3 + 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        overflow: 'hidden'
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        fontWeight: '600',
        color: color.black,
    },
    backButton: {
        backgroundColor: `${color.accent}20`,
        height: 45,
        width: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    body: {
        paddingHorizontal: 20
    },

    bodySortByButton: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`,
        marginTop: 10
    },

    bodySortByButtonTitle: {
        fontWeight: '600'
    },

    bodySortByButtonText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    modalView: {
        width: width - 40,
        backgroundColor: color.mainBackground,
        borderRadius: 20,
        padding: 20,
        shadowColor: color.accent,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    modalViewHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    modalViewHeadText: {
        fontWeight: '600'
    },

    modalButton: {
        height: 45,
        backgroundColor: `${color.accent}20`,
        marginTop: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalButtonText: {
        color: color.accent,
        fontWeight: '600'
    }
})