import { StyleSheet } from 'react-native';
import colors from './colors.js';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  loginImage: {
    position: 'relative',
    marginTop: 70,
    marginBottom: 60,
    height: 130,
    width: '75%',
  },

  box: {
    position: 'relative',
    padding: 10,
    border: `1px solid ${colors.gray}`,
    borderRadius: 5,
    width: '75%',
    boxShadow: `2px 2px 3px -2px ${colors.black}`,
  },

  boxContent: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'left',
  },

  button: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  toast: {
    position: 'absolute',
    top: 50,
    zIndex: 10,
    width: '70%',
  },
});
