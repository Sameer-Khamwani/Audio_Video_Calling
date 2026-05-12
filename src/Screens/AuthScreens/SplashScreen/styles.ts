import { StyleSheet } from 'react-native';
import { heightPixel } from '../../../Utils/helper';

export const styles = StyleSheet.create({
  appWrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    alignItems: 'center',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
  },
  firstButtonStyle: {
    width: '100%',
    marginTop: '20%',
  },
  secondButtonStyle: {
    width: '100%',
    marginTop: heightPixel(20),
  },
  disclaimerTextStyle: {
    marginTop: heightPixel(20),
  },
});
