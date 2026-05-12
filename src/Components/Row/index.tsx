import React, {FC, memo, ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import { IRow } from '../../Utils/interface';
import { styles } from './style';

const Row: FC<IRow> = ({
  justifyContent = 'flex-start',
  alignItems = 'center',
  children,
  style,
  gap,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={onPress ? false : true}>
    <View
      style={[
        styles.rowContainer,
        {
          justifyContent: justifyContent,
          alignItems: alignItems,
          gap: gap,
        },
        style,
      ]}>
      {children}
    </View>
    </TouchableOpacity>
  );
};

export default memo(Row);
