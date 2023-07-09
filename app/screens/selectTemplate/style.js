import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import color from '../../style/color';

const { width, height } = Dimensions.get('window')

export const imageWidth = (width / 2) - 20;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        justifyContent: 'center',
    },

    blank: {
        flex: 1,
        opacity: 0,
    },

    sheetContainer: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: Platform.OS == 'android' ? color.mainBackground : color.transparent,
    },

    sheet: {
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

    imageButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },

    imageButton: {
        width: (width / 2) - 20,
        backgroundColor: color.transparent,
        marginHorizontal: 10,
        marginBottom: 20
    },

    image: {
        width: imageWidth
    },

    imageLabel: {
        textAlign: 'center',
        marginTop: 2
    }
});