import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { colors } from '../../Utils/theme';
import CustomText from '../CustomText';

const CustomBottomTab = (props: any) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.innerTabContainer}>
      {state?.routes?.map((route: string | any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const focused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.tabItem}
            onPress={onPress}>
            {options?.tabBarIcon({ focused })}
            <CustomText
              disabled={true}
              text={label}
              size={11}
              weight="semibold"
              style={styles.textStyle}
              color={focused ? colors.primary : colors.lightText}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;
