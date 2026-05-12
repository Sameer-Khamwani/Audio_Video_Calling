import { StyleSheet } from 'react-native';
import { colors } from '../../Utils/theme';
import { heightPixel, widthPixel } from '../../Utils/helper';

export const styles = StyleSheet.create({
  counterContainer: {
    borderColor: colors.lightBorder,
    borderRadius: widthPixel(12),
    paddingVertical: heightPixel(6),
    backgroundColor: colors.white,
  },
  valueContainer: {
    minWidth: widthPixel(20),
    alignItems: 'center',
  },
});
