import { StyleSheet } from 'react-native';
import colors from './colors.js';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },

  safeAreaView: { backgroundColor: 'white', height: '100%' },

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

  flexBoxRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    textTransform: 'uppercase',
    fontFamily: "'oswald-regular', sans-serif",
    fontSize: '13px',
  },

  smallButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    textTransform: 'uppercase',
    fontFamily: "'oswald-regular', sans-serif",
    fontSize: '11px',
  },

  testButton: status => {
    if (status === 'pending') {
      return {
        borderColor: colors.red,
        backgroundColor: colors.red,
        textTransform: 'uppercase',
        fontFamily: "'oswald-regular', sans-serif",
        fontSize: '11px',
      };
    }

    if (status === 'in progress') {
      return {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        textTransform: 'uppercase',
        fontFamily: "'oswald-regular', sans-serif",
        fontSize: '11px',
      };
    }

    if (status === 'delivered') {
      return {
        borderColor: 'rgba(96, 148, 117, 0.7)',
        backgroundColor: 'rgba(96, 148, 117, 0.7)',
        textTransform: 'uppercase',
        fontFamily: "'oswald-regular', sans-serif",
        fontSize: '11px',
      };
    }
  },

  modalButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    textTransform: 'uppercase',
    fontFamily: "'oswald-regular', sans-serif",
    fontSize: '13px',
    width: '100%',
  },

  select: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: 'center',
    padding: 2,
    margin: '0 auto',
  },

  toast: {
    position: 'absolute',
    zIndex: 10,
    width: '70%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  headerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colors.white,
  },

  headerImage: {
    position: 'relative',
    height: 40,
    width: '50%',
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  restaurantCard: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    boxShadow: `1px 2px 5px -3px ${colors.black}`,

    image: {
      width: '100%',
    },
  },

  accountCard: {
    width: '8rem',
    boxShadow: `1px 2px 5px -3px ${colors.black}`,
  },

  userSvg: {
    height: '70%',
    margin: 'auto',
    color: '#da583b',
  },

  accountSvg: {
    height: '8rem',
  },

  productCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'top',
    paddingTop: 20,

    image: {
      width: 60,
    },
  },

  counterBox: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalHeader: {
    backgroundColor: colors.black,
    color: colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  modalIcon: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '0.5rem',
    height: '3rem',
  },

  modalFooter: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    width: '100%',
  },

  modalTotal: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
  },

  modalTotalContent: {
    alignSelf: 'end',
  },

  checkForm: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  tableHead: {
    backgroundColor: colors.black,
    color: colors.white,
  },

  bottomTabIcon: {
    backgroundColor: colors.purple,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
});
