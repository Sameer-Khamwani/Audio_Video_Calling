import { Platform, StyleSheet } from 'react-native';
import { fonts } from '../../Assets/Fonts';
import { vh, vw, heightPixel, widthPixel, font } from '../../Utils/helper';
import { colors } from '../../Utils/theme';


const styles = StyleSheet.create({
  container: {
    marginTop: vh * 1,
    width: '100%',
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  label: {
    fontSize: vh * 1.8,
  },
  required: {
    marginLeft: vw * 0.5,
    fontSize: vh * 1.5,
    color: 'red',
  },
  labelContainer: {
    marginVertical: heightPixel(5),
  },
  textInputContainer: {
    paddingHorizontal: vw * 2,
    borderRadius: heightPixel(14),
    backgroundColor: colors.white,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.white,
    height: vh * 6,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  leftIcon: {
    width: vh * 3.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    paddingHorizontal: vw * 2,
    // paddingVertical: Platform.OS === 'ios' ? vh * 1.5 : 0,
    fontSize: font(14),
    fontFamily: fonts.Poppins.regular,
    color: 'black',
    width: '100%',
  },
  eyeView: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  eyeImage: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
  },
  rightIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  inheritContainer: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    marginVertical: vh * 0.7,
    marginLeft: vw * 5,
  },
  inputErrorSpacing: {
    marginTop: heightPixel(5),
  },
  textInputWithIcon: {
    width: '90%',
  },
  errorContainer: {
    // reserved for error message wrapper if needed
  },
});
export default styles;
