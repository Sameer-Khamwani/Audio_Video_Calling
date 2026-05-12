import { StyleSheet } from 'react-native';
import { heightPixel } from '../../../Utils/helper';

export const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: heightPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
    padding: heightPixel(20),
  },
  loginIconStyle: {
    marginBottom: heightPixel(45),
  },
  subtitleStyle: {
    textAlign: 'center',
    marginBottom: heightPixel(30),
  },
  rememberMeRowStyle: {
    width: '100%',
    marginTop: heightPixel(5),
  },
  forgotPasswordStyle: {
    textDecorationLine: 'underline',
  },
  signInButtonStyle: {
    width: '100%',
    marginTop: heightPixel(60),
  },
});
