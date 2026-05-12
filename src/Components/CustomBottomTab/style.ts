import { StyleSheet } from 'react-native';
import { heightPixel, widthPixel } from '../../Utils/helper';
import { colors } from '../../Utils/theme';

export const styles = StyleSheet.create({
  tabContainer: {
    height: heightPixel(77),
    width: widthPixel(375),
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  innerTabContainer: {
    height: heightPixel(80),
    backgroundColor: colors.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    borderLeftColor: colors.border,
    borderLeftWidth: 0.8,
  },
  textStyle: {
    lineHeight: heightPixel(18),
    marginTop: heightPixel(2),
  },
});
