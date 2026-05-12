import { View } from "react-native";
import CustomText from "../../../Components/CustomText";
import colors from "../../../Utils/theme";
import Button from "../../../Components/Button";
import AppWrapper from "../../../Components/AppWrapper";
import { heightPixel } from "../../../Utils/helper";
import { styles } from './styles';

const SplashScreen = () => {
    return (
        <AppWrapper style={styles.appWrapperStyle}>
            <CustomText
                size={36}
                text="MediConnect"
                weight="bold"
            />
            <CustomText
                size={18}
                text="Your Practice, Your App"
                weight="semibold"
            />
            <View style={styles.buttonContainerStyle}>
                <Button size={16} children="Register as Doctor" style={styles.firstButtonStyle} />
                <Button size={16} weight="bold" buttonType="secondary" children="Login" style={styles.secondButtonStyle} />
                <CustomText
                    text="By joining, you agree to our Terms of Service & Privacy Policy."
                    size={12}
                    color={colors.lightGray}
                    weight="semibold"
                    style={styles.disclaimerTextStyle}
                />
            </View>

        </AppWrapper>
    );
};

export default SplashScreen;