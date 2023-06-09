import { StyleSheet, StatusBar, Platform } from 'react-native'
import color from './color'

export const header = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight - 30 : 30,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  logo: {
    fontSize: 30,
    margin: 0,
    marginTop: -10,
    color: `${color.black}80`,
    fontWeight: '900'
  },

  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})