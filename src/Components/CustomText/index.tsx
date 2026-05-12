import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { ICustomText } from '../../Utils/interface';
import { colors } from '../../Utils/theme';
import { font } from '../../Utils/helper';

const CustomText: FC<ICustomText> = ({
  style,
  weight = 'regular',
  lines,
  text,
  color = colors.black,
  size = 14,
  required,
  requiredStyle,
  textContainer,
  onPress,
  disabled = false
}) => {
  let font_Style = {
    fontSize: font(size),
    color: color,
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled ? disabled : onPress ? false : true} style={[styles.row, styles.labelContainer, textContainer]}>
      <Text
        numberOfLines={lines}
        allowFontScaling={false}
        adjustsFontSizeToFit={false}
        style={[style, styles[`${weight}`], font_Style]}>
        {text}
      </Text>
      {required && (
        <Text allowFontScaling={false} style={[styles.required, requiredStyle]}>
          *
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomText;
