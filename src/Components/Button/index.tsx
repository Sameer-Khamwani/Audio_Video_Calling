import React, { FC } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import CustomText from '../CustomText';
import Icons from '../ImageIcons/Icons';
import { IButton } from '../../Utils/interface';
import colors from '../../Utils/theme';
import Loader from '../Loader';
import { icons } from '../../Assets/Icons';
import Row from '../Row';

const Button: FC<IButton> = ({
  onPress,
  children,
  style,
  size = 14,
  textStyle,
  weight = 'semibold',
  buttontextcolor,
  buttonType = 'primary',
  loader,
  loaderColor,
  disabled,
  icon,
  iconColor,
  iconSize
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled ? disabled : loader}
      style={[
        buttonType === 'primary'
          ? [styles.primaryButtonContainer, { backgroundColor: disabled ? colors.lightText : colors.primary }]
          : [styles.secondaryButtonContainer, { borderColor: colors.primary, }],
        style,
      ]}>
      {loader ? (
        <ActivityIndicator size="small" color={loaderColor ?? colors.white} />
      ) : (
        <Row style={styles.contentRow}>
          <CustomText
            size={size}
            style={textStyle}
            text={children}
            disabled={true}
            weight={weight}
            color={
              buttontextcolor
                ? buttontextcolor
                : buttonType === 'primary'
                  ? colors.white
                  : buttonType === 'secondary'
                    ? colors.black
                    : buttontextcolor
            }
          />
          {icon && <Icons source={icon} disabled={true} size={iconSize ? iconSize : size ? size : 18} color={iconColor} />}
        </Row>

      )}
    </TouchableOpacity>
  );
};

export default Button;
