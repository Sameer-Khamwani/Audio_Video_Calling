import { FC } from 'react';
import { Image, Pressable, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { heightPixel } from '../../Utils/helper';
import { IIcons } from '../../Utils/interface';

const ImageIcons: FC<IIcons> = ({
  source,
  onPress,
  color,
  style,
  size = 30,
  disabled = false,
  hitSlop
}) => {
  const size_style = {
    height: heightPixel(size),
    width: heightPixel(size),
  };

  return (
    <TouchableOpacity
      hitSlop={hitSlop || 8}
      onPress={onPress}
      // style={({ pressed }) => [pressed && styles.pressed]}
      disabled={disabled ? disabled : onPress ? false : true}>
      <Image
        style={[styles.imageStyle, style, { tintColor: color }, size_style]}
        source={source}
      />
    </TouchableOpacity>
  );
};

export default ImageIcons;
