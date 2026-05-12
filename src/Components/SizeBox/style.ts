import { StyleSheet } from 'react-native';
import { heightPixel, widthPixel } from '../../Utils/helper';

export const createSizeBoxStyles = (widthSize: number, heightSize: number) =>
  StyleSheet.create({
    main: {
      width: widthPixel(widthSize),
      height: heightPixel(heightSize),
    },
  });
