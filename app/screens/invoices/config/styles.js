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
        // height: (2 * height) / 3 + 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        overflow: 'hidden',
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
        color: color.dark,
    },
    backButton: {
        backgroundColor: `${color.accent}30`,
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
        marginTop: 20
    },

    bodySortByButtonTitle: {
        fontWeight: '600'
    },

    bodySortByButtonText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: `${color.accent}40`,
        padding: 5,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: '600',
        overflow: 'hidden',
        color: color.accent
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
    },

    doneButton: {
        backgroundColor: color.accent,
        borderRadius: 12,
        marginBottom: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    doneButtonText: {
        color: color.white,
        fontWeight: '600'
    }
})