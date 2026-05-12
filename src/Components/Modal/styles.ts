import { StyleSheet } from 'react-native';
import { colors } from '../../Utils/theme';
import { heightPixel, vh, vw, widthPixel } from '../../Utils/helper';

export const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    backgroundColor: colors.lightBorder,
    justifyContent: 'space-between',
    borderRadius: heightPixel(30),
    paddingVertical: heightPixel(40),
    paddingHorizontal: widthPixel(15),
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: heightPixel(15),
    right: widthPixel(15),
  },
  modalImage: {
    height: heightPixel(140),
    width: widthPixel(140),
    resizeMode: 'contain',
  },
  modalText: {
    width: '100%',
    marginVertical: vh,
    textAlign: 'center',
    lineHeight: vh * 2.5,
  },
  customButton: {
    marginVertical: heightPixel(20),
    height: heightPixel(42),
  },
  buttonRow: {
    flexDirection: 'row',
    minWidth: '100%',
    justifyContent: 'space-evenly',
  },
  twoButton: {
    minWidth: widthPixel(110),
    borderWidth: 2,
    borderColor: colors.primary,
  },
  twoButtonSecondary: {
    minWidth: widthPixel(110),
    borderWidth: 2,
  },
  childrenContainer: {
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  headerText: {
    textAlign: 'center',
    marginTop: heightPixel(20),
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
