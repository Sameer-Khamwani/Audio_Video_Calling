import { FC } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../../Utils/theme';
import CustomText from '../CustomText';
import { styles } from './style';
import { ICheckBox } from '../../Utils/interface';


const CheckBox: FC<ICheckBox> = ({
  value,
  onPress,
  text,
  textStyle,
  isLoading = false,
  tintColor = colors.green,
  backgroundColor,
  style,
  size = 14,
  borderColor,
  filledBoxStyle
  , rootStyle
}) => {
  console.log('value', value);
  const fillColor = tintColor === colors.green ? (value ? colors.primary : undefined) : tintColor;
  return (
    <View style={[styles.rootContainer, rootStyle]}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => onPress && onPress(!value)}
        style={[styles.checkbox, { backgroundColor, borderColor }, style]}>
        {value ? (
          <View style={[styles.filledBox, { backgroundColor: fillColor || colors.primary }, filledBoxStyle]} />
        ) : null}
      </TouchableOpacity>
      {text && <CustomText text={text} size={size} style={textStyle} />}
    </View>
  );
};

export default CheckBox;
