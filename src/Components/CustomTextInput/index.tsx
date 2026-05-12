import React, { FC, isValidElement, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';
import Icons from '../ImageIcons/Icons';
import { ICustomTextInput } from '../../Utils/interface';
import colors from '../../Utils/theme';
import icons from '../../Assets/Icons';
const CustomTextInput: FC<ICustomTextInput> = ({
  name,
  label,
  required,
  leftIcon,
  children,
  rightIcon,
  leftIconStyle,
  rightIconStyle,
  onPressRightIcon,
  secureTextEntry = false,
  eyeIconStyle,
  containerStyle,
  disabled,
  textInputContainerStyle,
  onChangeText,
  value,
  placeholder,
  style,
  labelStyle,
  requiredStyle,
  returnKeyType,
  multiline,
  lines,
  keyboardType,
  size = 18,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false);
  const inputProps = {
    editable: !disabled,
    secureTextEntry: showPassword,
    onChangeText: onChangeText,
    returnKeyType: returnKeyType ? returnKeyType : 'default',
    autoCorrect: false,
    keyboardType: keyboardType,
    value: value,
    placeholder: placeholder ? placeholder : '',
    multiline: multiline ? true : false,
    style: [
      styles.textInput,
      (leftIcon || rightIcon || secureTextEntry) && styles.textInputWithIcon,
      // ((leftIcon && rightIcon) || secureTextEntry) && {width: '80%'},
      style,
    ],
    onFocus: () => setFocused(e => !e),
    onBlur: () => setFocused(e => !e),
  };
  return (
    <View
      pointerEvents={disabled ? 'none' : undefined}
      style={[styles.container, containerStyle]}>
      {label && (
        <View style={[styles.row, styles.labelContainer]}>
          <CustomText
            text={label}
            weight="semibold"
            style={[styles.label, labelStyle]}
            lines={lines}></CustomText>
          {required && (
            <Text allowFontScaling style={[styles.required, requiredStyle]}>
              *
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.row,
          styles.textInputContainer,
          textInputContainerStyle,
        ]}>
        {leftIcon && (
          <View style={[styles.leftIcon, leftIconStyle]}>
            <Icons
              size={size}
              style={[styles.inheritContainer]}
              source={leftIcon}
              color={disabled ? colors.lightGray : colors.gray}
            />
          </View>
        )}
        {children && isValidElement(children) ? (
          React.cloneElement(children, inputProps)
        ) : (
          <TextInput {...inputProps} placeholderTextColor={colors.lightText} />
        )}
        {rightIcon ? (
          <TouchableOpacity onPress={onPressRightIcon} style={[styles.eyeView]}>
            <Icons
              size={size}
              style={[styles.rightIcon, rightIconStyle]}
              source={rightIcon}
            />
          </TouchableOpacity>
        ) : secureTextEntry ? (
          <View
            // disabled={!secureTextEntry}
            style={[styles.eyeView]}>
            {secureTextEntry && (
              <Icons
                size={22}
                onPress={() => setShowPassword(!showPassword)}
                style={[styles.eyeImage, eyeIconStyle]}
                source={showPassword ? icons.hide : icons.show}
                color={colors.black}
              />
            )}
          </View>
        ) : null}
      </View>
      {error && (
        <CustomText
          text={error}
          color={colors.red}
          size={12}
          style={styles.inputErrorSpacing}
        />
      )}
    </View>
  );
};
export default CustomTextInput;
