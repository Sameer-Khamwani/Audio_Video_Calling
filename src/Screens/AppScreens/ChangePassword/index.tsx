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
import { changePasswordValidationSchema, changePasswordInitialValues } from "../../../Utils/validation";
import { goBack } from "../../../Utils/navigation";

const ChangePassword = () => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const onSubmit = (values: typeof changePasswordInitialValues) => {
        console.log("Change password submit:", values);
        setIsSuccessModalOpen(true);
    };

    return (
        <Formik
            initialValues={changePasswordInitialValues}
            validationSchema={changePasswordValidationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched, handleBlur, resetForm }) => (
                <AppWrapper>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageIcons source={icons.key} size={100} />
                        <CustomText text="Secure Your Account" size={24} weight="bold" style={styles.heading} />
                        <CustomText color={colors.lightGray} style={styles.descriptionText} text="Update your password regularly to keep your health records and personal data safe." />
                        <View style={styles.formCard}>
                            <CustomTextInput
                                onBlur={handleBlur("currentPassword")}
                                label="Current Password"
                                placeholder="Enter your current password"
                                secureTextEntry={true}
                                value={values.currentPassword}
                                onChangeText={handleChange("currentPassword")}
                                error={touched.currentPassword && errors.currentPassword ? errors.currentPassword : undefined}
                            />
                            <CustomTextInput
                                onBlur={handleBlur("newPassword")}
                                label="New Password"
                                placeholder="Enter your new password"
                                secureTextEntry={true}
                                value={values.newPassword}
                                onChangeText={handleChange("newPassword")}
                                error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                            />
                            <CustomTextInput
                                onBlur={handleBlur("confirmPassword")}
                                label="Confirm New Password"
                                placeholder="Re-enter new password"
                                secureTextEntry={true}
                                value={values.confirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                            />
                        </View>
                        <View style={styles.divider} />
                        <Button
                            icon={icons.privacy}
                            iconColor={colors.white}
                            style={styles.primaryButton}
                            children="Save New Password"
                            size={16}
                            iconSize={22}
                            onPress={handleSubmit as any}
                        />
                    </ScrollView>
                    <ModalComponent
                        open={isSuccessModalOpen}
                        close={() => {
                            setIsSuccessModalOpen(false)
                            resetForm();
                            goBack();
                        }}
                        icon={icons.modalIcon}
                        header="Password Updated"
                        text="Your password has been reset successfully. Please login with your new password."
                        buttonStyle={styles.successModalButton}
                        buttons={[
                            {
                                text: "OK",
                                onPress: () => {
                                    setIsSuccessModalOpen(false)
                                    resetForm();
                                    goBack();
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

export default ChangePassword;