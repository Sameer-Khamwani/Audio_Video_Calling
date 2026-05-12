import { StyleSheet } from 'react-native';
import { font, heightPixel, vh, vw } from '../../Utils/helper';
import { colors } from '../../Utils/theme';

export const styles = StyleSheet.create({
  mainStyle: {
    width: '100%',
    zIndex: 1000,
    alignSelf: 'center',
    // marginVertical: '2%',
  },
  fieldContainer: {
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: heightPixel(14),
    zIndex: -1,
  },
  leftIconInside: {
    position: 'absolute',
    left: vw * 4,
    top: heightPixel(9),
    transform: [{ translateY: -9 }],
    zIndex: 1000,
  },
  errorText: {
    marginTop: vh * 0.7,
  },
  row: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  dropdownStyle: {
    flex: 1,
    paddingHorizontal: vw * 3,
    // borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    zIndex: 1000,
    fontSize: font(12),
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  dropdownWithLeftIcon: {
    // paddingLeft: vw * 10,
  },
  containerStyle: {
    // marginTop: vh,
    width: '100%',
    zIndex: 1000,
    // backgroundColor: 'rgba(0,0,0,0)',
  },
  placeholderStyle: {
    color: colors.lightText,
  },
  badgeStyle: {
    backgroundColor: colors.lightPrimary,
    borderColor: colors.black,
  },
  badgeTextStyle: {
    fontSize: font(12),
  },
  arrow_down_icon: {
    width: vh * 3,
    height: vh * 3,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  arrow_up_icon: {
    width: vh * 2,
    height: vh * 2,
    resizeMode: 'contain',
    marginRight: vw,
    tintColor: colors.white,
  },
  label: {
    fontSize: vh * 1.6,
    color: colors.black,
  },
  labelContainer: {
    marginTop: heightPixel(15),
  },
  required: {
    fontSize: vh * 1.5,
    color: colors.black,
  },
  errorWrapper: {
    width: '100%',
  },
  containerWithNoMargin: {
    marginTop: 0,
  },
});
