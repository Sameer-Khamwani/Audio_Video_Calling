import { ScrollView, View } from "react-native";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import { heightPixel } from "../../../Utils/helper";
import CustomTextInput from "../../../Components/CustomTextInput";
import { colors } from "../../../Utils/theme";
import Button from "../../../Components/Button";
import icons from "../../../Assets/Icons";
import { Formik } from "formik";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import { navigate } from "../../../Utils/navigation";
import { styles } from './styles';
import { forgotPasswordValidationSchema, forgotPasswordInitialValues } from "../../../Utils/validation";

const ForgotPassword = () => {
    const onSubmit = (values: typeof forgotPasswordInitialValues) => {
        console.log("Forgot password submit:", values);
        navigate('VerifyCode');
    };
    return (
        <Formik
            initialValues={forgotPasswordInitialValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <AppWrapper paddingHorizontal={0}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageIcons source={icons.forgotPassword} size={100} style={styles.forgotPasswordIconStyle} />
                        <CustomText text="Forgot Password" size={24} weight="bold" />
                        <CustomText text="Enter your registered email to receive a secure 6-digit reset code." style={styles.subtitleStyle} />
                        <View style={styles.formContainerStyle}>
                            <CustomTextInput
                                label="EMAIL"
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                error={touched.email && errors.email ? errors.email : undefined}
                            />
                            <Button
                                size={16}
                                children="Next"
                                style={styles.nextButtonStyle}
                                onPress={handleSubmit as any}
                            />
                        </View>
                        <CustomText onPress={() => navigate('Login')} text="Back to Login" color={colors.primary} weight="semibold" style={styles.backToLoginStyle} />
                    </ScrollView>
                </AppWrapper>
            )}
        </Formik>
    )
}

export default ForgotPassword;