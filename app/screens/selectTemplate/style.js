import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: `${color.black}20`,
        justifyContent: 'flex-end'
    },

    blank: {
        flex: 1
    },

    sheet: {
        height: height - (StatusBar.currentHeight + 100),
        backgroundColor: color.mainBackground,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },

    head: {
        minHeight: 50,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },

    headText: {
        fontSize: 20,
        fontWeight: '600'
    },

    backButton: {
        backgroundColor: `${color.accent}20`,
        height: 45,
        width: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageButton: {
        backgroundColor: color.transparent,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        marginHorizontal: 20,
    },

    image: {
        marginBottom: 20,
        borderRadius: 20,
    }
})

export const imageWidth = width - 40