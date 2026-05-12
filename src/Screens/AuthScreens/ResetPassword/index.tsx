import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Formik } from "formik";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import CustomTextInput from "../../../Components/CustomTextInput";
import Button from "../../../Components/Button";
import styles from "./styles";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import icons from "../../../Assets/Icons";
import { colors } from "../../../Utils/theme";
import ModalComponent from "../../../Components/Modal";
import { navigate } from "../../../Utils/navigation";
import { resetPasswordValidationSchema, resetPasswordInitialValues } from "../../../Utils/validation";

const ResetPassword = () => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const onSubmit = (values: typeof resetPasswordInitialValues) => {
        console.log("Reset password submit:", values);
        setIsSuccessModalOpen(true);
    };

    return (
        <Formik
            initialValues={resetPasswordInitialValues}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <AppWrapper>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageIcons source={icons.resetPassword} size={100} style={styles.iconSpacing} />
                        <CustomText text="Create New Password" size={24} weight="bold" style={styles.heading} />
                        <CustomText style={styles.descriptionText} text="Please choose a strong password that you haven't used before to ensure your account security." />
                        <CustomTextInput
                            label="New Password"
                            placeholder="Enter your new password"
                            secureTextEntry={true}
                            value={values.newPassword}
                            onChangeText={handleChange("newPassword")}
                            error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                        />
                        <CustomTextInput
                            label="Confirm Password"
                            placeholder="Confirm your new password"
                            secureTextEntry={true}
                            value={values.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                        />
                        <View style={styles.divider} />
                        <Button
                            style={styles.primaryButton}
                            children="Save Password"
                            size={16}
                            onPress={handleSubmit as any}
                        />
                        <CustomText
                            text="Back to Login"
                            color={colors.primary}
                            weight="semibold"
                            style={styles.backToLogin}
                            onPress={() => { }}
                        />
                    </ScrollView>
                    <ModalComponent
                        open={isSuccessModalOpen}
                        close={() => {
                            setIsSuccessModalOpen(false);
                            navigate('Login');
                        }}
                        icon={icons.modalIcon}
                        header="Password Reset Successful!"
                        text="Your password has been reset successfully. Please login with your new password."
                        buttonStyle={styles.successModalButton}
                        buttons={[
                            {
                                text: "OK",
                                onPress: () => {
                                    setIsSuccessModalOpen(false);
                                    navigate('Login');
                                },
                                type: "primary",
                            },
                        ]}
                    />
                </AppWrapper>
            )}
        </Formik>
    )
}

export default ResetPassword;