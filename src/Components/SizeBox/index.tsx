import React from 'react';
import { View } from 'react-native';
import { createSizeBoxStyles } from './style';

const SizeBox = ({ widthSize = 1, heightSize = 1 }) => {
  const styles = createSizeBoxStyles(widthSize, heightSize);

  return <View style={styles.main} />;
};

export default SizeBox;
