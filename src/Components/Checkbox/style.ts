import { StyleSheet } from 'react-native';
import { colors } from '../../Utils/theme';
import { vh, vw, widthPixel } from '../../Utils/helper';

export const styles = StyleSheet.create({
  tick_style: {
    resizeMode: 'contain',
  },
  tick_container: {
    width: vh * 2,
    height: vh * 2,
    borderWidth: 1,
    borderColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: vw * 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vh,
  },
  checkbox: {
    width: vh * 2,
    height: vh * 2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: widthPixel(8),
    borderRadius: 4
  },
  filledBox: {
    width: '65%', // Adjust size of inner box
    height: '65%',
    backgroundColor: colors.black, // Default fill color
  },
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vh,
    // gap : widthPixel(5)
  },
});
