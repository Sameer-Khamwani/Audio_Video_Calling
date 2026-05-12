import { StyleSheet } from 'react-native';
import { heightPixel, widthPixel } from '../../../Utils/helper';
import { colors } from '../../../Utils/theme';

export const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: heightPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthPixel(20),
  },
  forgotPasswordIconStyle: {
    marginBottom: heightPixel(30),
  },
  subtitleStyle: {
    textAlign: 'center',
    marginBottom: heightPixel(50),
    width: '80%',
  },
  formContainerStyle: {
    width: '100%',
    backgroundColor: colors.white,
    marginBottom: heightPixel(20),
    borderColor: colors.lightBorder,
    borderRadius: heightPixel(14),
    padding: heightPixel(20),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextButtonStyle: {
    width: '100%',
    marginVertical: heightPixel(30),
  },
  backToLoginStyle: {
    marginTop: heightPixel(80),
  },
});
