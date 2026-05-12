import { FC } from "react";
import { Image, View } from "react-native";
import Button from "../../Components/Button";
import CustomText from "../../Components/CustomText";
import { IOnBoarding } from "../../Utils/interface";
import colors from "../../Utils/theme";
import { styles } from "./styles";



const OnBoarding: FC<IOnBoarding> = ({ activeDot = 0, image, title, subtitle, children, onPress, onPressSkip }) => {
    return (
        <View style={styles.container}>
            {/* Doctor Image — fills the full screen behind the card */}
            <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Bottom Card — overlays the image */}
            <View style={styles.card}>
                {/* Title */}
                <CustomText
                    text={title}
                    size={18}
                    weight="bold"
                    color={colors.black}
                    style={styles.title}
                />

                {/* Subtitle */}
                <CustomText
                    text={subtitle}
                    color={colors.lightText}
                    style={styles.subtitle}
                    lines={3}
                />

                {/* Next Button */}
                <Button
                    children={children}
                    onPress={onPress}
                    buttonType="primary"
                    style={styles.button}
                    size={18}
                />

                {/* Pagination Dots */}
                <View style={styles.dotsContainer}>
                    <View style={[styles.dot, activeDot === 1 ? styles.activeDot : {}]} />
                    <View style={[styles.dot, activeDot === 2 ? styles.activeDot : {}]} />
                    <View style={[styles.dot, activeDot === 3 ? styles.activeDot : {}]} />
                </View>

                {/* Skip */}
                {onPressSkip && <CustomText
                    text="Skip"
                    size={14}
                    weight="regular"
                    color={colors.lightText}
                    style={styles.skip}
                    onPress={onPressSkip}
                />}
            </View>
        </View>
    );
};



export default OnBoarding;
