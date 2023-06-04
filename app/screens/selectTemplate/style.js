import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import color from '../../style/color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const imageWidth = windowWidth - 40;

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: `${color.black}20`,
        justifyContent: 'center',
    },
    blank: {
        flex: 1,
        opacity: 0,
    },
    sheet: {
        height: (2 * windowHeight) / 3 + 100, // Add 100 to the height for extra height
        backgroundColor: color.mainBackground,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
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
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButton: {
        backgroundColor: color.transparent,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: imageWidth,
        height: imageWidth,
    },
});