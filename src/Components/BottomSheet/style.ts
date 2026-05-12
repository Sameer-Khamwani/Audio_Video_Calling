import { StyleSheet } from 'react-native';
import { widthPixel, heightPixel } from '../../Utils/helper';
import { colors } from '../../Utils/theme';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: widthPixel(20),
    borderTopRightRadius: widthPixel(20),
    paddingHorizontal: widthPixel(30),
    paddingVertical: heightPixel(16),
    // maxHeight: '70%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  handleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: heightPixel(10),
  },
  handle: {
    width: widthPixel(50),
    height: heightPixel(5),
    backgroundColor: colors.lightText,
    borderRadius: widthPixel(10),
  },
  rowStyle: {
    gap: widthPixel(16),
    paddingBottom: heightPixel(6),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primary,
  },
  buttonStyle: {
    width: '48%',
  },
  modalRoot: {
    backgroundColor: 'green',
  },
  sheetDragHandle: {
    height: heightPixel(8),
    backgroundColor: colors.lightBorder,
    borderRadius: widthPixel(10),
    width: widthPixel(130),
    alignSelf: 'center',
    marginBottom: heightPixel(8),
  },
});
