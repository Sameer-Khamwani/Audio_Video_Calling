import { StyleSheet } from 'react-native';
import { heightPixel, widthPixel } from '../../Utils/helper';
import { colors } from '../../Utils/theme';
import { font } from '../../Utils/helper';

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    // paddingVertical: heightPixel(20),
    // paddingHorizontal: widthPixel(),
    gap: widthPixel(12),
    justifyContent: 'center',
  },
  input: {
    fontSize: font(13),
    color: colors.black,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    height: heightPixel(40),
  },
  buttonStyle: {
    height: heightPixel(53),
    width: '22%',
  },
});

export default styles;
