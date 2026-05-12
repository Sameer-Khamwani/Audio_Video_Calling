import { StyleSheet } from 'react-native';
import colors from '../../Utils/theme';
import { heightPixel, widthPixel } from '../../Utils/helper';
export const styles = StyleSheet.create({
  main_style: {
    height: heightPixel(6),
  },
  black_box: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: heightPixel(1),
    marginVertical: heightPixel(2),
    borderRadius: widthPixel(10),
  },

  text_style: {
    color: 'white',
    fontSize: heightPixel(1.8),
  },
  primaryButtonContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: widthPixel(20),
    height: heightPixel(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: heightPixel(14),
    flexDirection: 'row',
    elevation: 4
  },
  secondaryButtonContainer: {
    // paddingHorizontal: '2%',
    height: heightPixel(50),
    paddingHorizontal: widthPixel(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: heightPixel(14),
    borderColor: colors.white,
    backgroundColor: colors.lightBorder,
    elevation: 6,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  contentRow: {
    gap: widthPixel(10),
  },
});
