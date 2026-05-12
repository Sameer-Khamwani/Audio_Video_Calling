import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { colors, useColors } from "../../Utils/theme";
import { styles } from "./style";
import { heightPixel, widthPixel } from "../../Utils/helper";

const ToggleSwitch = ({ value, onToggle }) => {
    const colors = useColors();
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, widthPixel(1)],
        outputRange: [0, heightPixel(17)],
    });

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onToggle}
            style={[
                styles.container,
                { backgroundColor: value ? colors.primary : colors.gray }
            ]}
        >
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ translateX }]
                    }
                ]}
            />
        </TouchableOpacity>
    );
};

export default ToggleSwitch;
