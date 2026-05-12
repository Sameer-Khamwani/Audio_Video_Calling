import { useFormikContext } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { font, vh } from '../../Utils/helper';
import { IDropDown } from '../../Utils/interface';
import { colors } from '../../Utils/theme';
import CustomText from '../CustomText';
import { styles } from './style';

const DropDown: FC<IDropDown> = ({
  name,
  items,
  mode,
  placeholder,
  onChangeValue,
  value = null,
  style,
  label,
  labelStyle,
  required,
  placeholderSize,
  dropDownStyle,
  leftIcon,
  multiple,
}) => {
  const [open, setOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState<string | string[] | null>(
    value ?? (multiple ? [] : null),
  );
  const [pickerItems, setPickerItems] = useState(items ?? []);

  useEffect(() => {
    setPickerValue(value ?? (multiple ? [] : null));
  }, [value, multiple]);

  useEffect(() => {
    setPickerItems(items ?? []);
  }, [items]);

  const formik = name ? useFormikContext<any>() : null;

  const errorName =
    name && formik && formik?.touched?.[name] && formik?.errors?.[name]
      ? formik.errors[name]
      : null;

  return (
    <View style={[styles.mainStyle, style]}>
      {label && (
        <View style={[styles.row, styles.labelContainer]}>
          <CustomText
            weight="semibold"
            style={[styles.label, labelStyle]}
            text={label}
            required={required}
          />
        </View>
      )}
      <View style={styles.fieldContainer}>
        {/* {leftIcon ? (
          <View style={styles.leftIconInside} pointerEvents="none">
            <Icons source={leftIcon} size={18} color={colors.gray} />
          </View>
        ) : null} */}
        {multiple ? (
          <DropDownPicker
            textStyle={{
              fontSize: font(14),
            }}
            multiple={true}
            dropDownDirection='BOTTOM'
            mode="BADGE"
            listMode={mode ? mode : 'MODAL'}
            open={open}
            value={Array.isArray(pickerValue) ? pickerValue : []}
            placeholder={placeholder}
            items={pickerItems}
            setOpen={setOpen}
            setValue={setPickerValue as any}
            setItems={setPickerItems}
            onChangeValue={(val: any) => onChangeValue?.(val ?? [])}
            style={[styles.dropdownStyle, leftIcon ? styles.dropdownWithLeftIcon : undefined, dropDownStyle]}
            containerStyle={[styles.containerStyle, styles.containerWithNoMargin]}
            badgeTextStyle={styles.badgeTextStyle}
            placeholderStyle={[
              styles.placeholderStyle,
              {
                fontSize: placeholderSize ? placeholderSize : vh * 1.55,
              },
            ]}
            labelStyle={styles.placeholderStyle}
          />
        ) : (
          <DropDownPicker
            textStyle={{
              fontSize: font(14),
            }}
            multiple={false}
            listMode={mode ? mode : 'MODAL'}
            open={open}
            value={typeof pickerValue === 'string' ? pickerValue : null}
            placeholder={placeholder}
            items={pickerItems}
            setOpen={setOpen}
            setValue={setPickerValue as any}
            setItems={setPickerItems}
            onChangeValue={(val: any) => onChangeValue?.(val ?? null)}
            style={[styles.dropdownStyle, leftIcon ? styles.dropdownWithLeftIcon : undefined, dropDownStyle]}
            containerStyle={[styles.containerStyle, styles.containerWithNoMargin]}
            placeholderStyle={[
              styles.placeholderStyle,
              {
                fontSize: placeholderSize ? placeholderSize : vh * 1.55,
              },
            ]}
            labelStyle={styles.placeholderStyle}
          />
        )}
      </View>
      {errorName ? (
        <View style={styles.errorWrapper}>
          <CustomText
            style={styles.errorText}
            size={font(12)}
            color={colors.red}
            text={typeof errorName === 'string' ? errorName : String(errorName)}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DropDown;
