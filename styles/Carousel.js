import { StyleSheet } from 'react-native';
import colours from '../constants/colours';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: colours.secondary
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: colours.tertiary,
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDefault: {
        marginTop: 15,
        backgroundColor: 'transparent',
        color: colours.tertiary,
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colours.tertiary
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: colors.black,
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});
