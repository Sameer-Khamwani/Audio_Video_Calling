import { StyleSheet } from 'react-native';
import { heightPixel, widthPixel } from '../../../Utils/helper';
import { colors } from '../../../Utils/theme';

export const styles = StyleSheet.create({
  appWrapperStyle: {
    alignItems: 'flex-start',
  },
  scrollViewStyle: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: heightPixel(20),
    paddingHorizontal: widthPixel(20),
  },
  stepRow: {
    marginVertical: heightPixel(22),
  },
  progressBarBackground: {
    flex: 1,
    height: heightPixel(4.5),
    borderRadius: heightPixel(7),
    backgroundColor: colors.border,
  },
  progressBarFilled: {
    flex: 1,
    height: heightPixel(4.5),
    borderRadius: heightPixel(7),
    backgroundColor: colors.primary,
    width: '100%',
  },
  infoBoxContainer: {
    padding: heightPixel(20),
    backgroundColor: colors.lightBlue,
    borderRadius: widthPixel(10),
    marginTop: heightPixel(20),
  },
  documentCardContainer: {
    borderRadius: widthPixel(10),
    borderColor: colors.white,
    backgroundColor: colors.white,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: heightPixel(20),
    padding: widthPixel(20),
  },
  requiredBadgeRow: {
    borderRadius: heightPixel(16),
    backgroundColor: colors.lightBorder,
    paddingHorizontal: widthPixel(12),
    paddingVertical: widthPixel(2),
    gap: widthPixel(6),
  },
  descriptionRow: {
    marginTop: heightPixel(12),
  },
  descriptionTextStyle: {
    width: '90%',
  },
  uploadIndicatorRow: {
    marginTop: heightPixel(12),
    gap: widthPixel(6),
  },
  submitButtonStyle: {
    width: '100%',
    marginTop: heightPixel(20),
  },
  backButtonStyle: {
    width: '100%',
    marginTop: heightPixel(20),
  },
});
